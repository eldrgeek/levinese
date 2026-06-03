#!/usr/bin/env python3
"""
Build src/data/atlas.json for the Levinese semantic atlas page.

  - Embeds 119 dictionary terms + 364 papers using BAAI/bge-large-en-v1.5
  - Projects to 3D and 2D via UMAP
  - Extracts citation edges from term provenance DOI slugs
  - Outputs src/data/atlas.json

Run locally before pushing; atlas.json is committed as a pre-built artifact.
Netlify build does NOT run this script (no ML deps in build env).
"""

import json, re, sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
TERMS_DIR = ROOT / "src/content/terms"
PAPERS_DIR = ROOT / "src/content/papers"
OUT_FILE = ROOT / "src/data/atlas.json"
MODEL_NAME = "BAAI/bge-large-en-v1.5"

UMAP_PARAMS = dict(n_neighbors=15, min_dist=0.1, metric="cosine", random_state=42)


# ── Readers ────────────────────────────────────────────────────────────────────

def read_terms():
    terms = []
    for md_file in sorted(TERMS_DIR.glob("*.md")):
        slug = md_file.stem
        text = md_file.read_text(encoding="utf-8")
        m = re.match(r"^---\n(.*?)\n---\n?(.*)", text, re.DOTALL)
        if not m:
            continue
        fm, body = m.group(1), m.group(2)

        def scalar(key):
            r = re.search(rf'^{key}:\s*"?([^"\n]+?)"?\s*$', fm, re.MULTILINE)
            return r.group(1).strip() if r else ""

        def flag(key):
            r = re.search(rf'^{key}:\s*(true|false)', fm, re.MULTILINE)
            return r.group(1) == "true" if r else False

        def lst(key):
            r = re.search(rf'^{key}:\s*\n((?:[ \t]*- .+\n?)+)', fm, re.MULTILINE)
            if not r:
                return []
            return [item.strip().strip('"\'') for item in re.findall(r'[ \t]*- (.+)', r.group(1))]

        title = scalar("title")
        subtitle = scalar("subtitle")
        is_new = flag("is_new")
        provenance = lst("provenance")
        source = scalar("source")
        # Also extract DOI slug from source field (e.g. "DOI 10.1234/foo.bar" → "10-1234-foo-bar")
        doi_m = re.search(r'DOI\s+(10\.\d{4,}/[^\s"\']+)', source, re.IGNORECASE)
        if doi_m:
            doi_slug = doi_m.group(1).rstrip('.').replace('.', '-').replace('/', '-')
            if doi_slug not in provenance:
                provenance.append(doi_slug)

        # Text to embed: title + subtitle + first prose paragraph (strip HTML tags)
        paras = [p.strip() for p in body.split("\n\n") if p.strip()]
        first_para = ""
        for p in paras:
            clean = re.sub(r"<[^>]+>", " ", p).strip()
            if len(clean) > 30:
                first_para = clean[:500]
                break

        embed_text = f"{title}. {subtitle}. {first_para}" if subtitle else f"{title}. {first_para}"

        terms.append({
            "slug": slug,
            "title": title,
            "subtitle": subtitle,
            "is_new": is_new,
            "provenance": provenance,
            "embed_text": embed_text.strip(),
            "url": f"/dictionary/#{slug}",
        })
    return terms


def read_papers():
    papers = []
    for jf in sorted(PAPERS_DIR.glob("*.json")):
        slug = jf.stem
        data = json.loads(jf.read_text(encoding="utf-8"))
        title = data.get("title", "") or ""
        abstract = data.get("abstract", "") or ""
        journal = data.get("journal", "") or ""
        year_raw = data.get("year")
        try:
            year = int(year_raw) if year_raw else None
        except (ValueError, TypeError):
            year = None

        embed_text = f"{title}. {abstract[:600]}".strip()
        abstract_short = abstract[:120].rstrip() + ("…" if len(abstract) > 120 else "")

        papers.append({
            "slug": slug,
            "title": title,
            "year": year,
            "journal": journal,
            "abstract_short": abstract_short,
            "embed_text": embed_text,
            "url": f"/corpus#{slug}",
        })
    return papers


# ── Embedding & Projection ─────────────────────────────────────────────────────

def embed(texts):
    from sentence_transformers import SentenceTransformer
    print(f"  Loading {MODEL_NAME}…")
    model = SentenceTransformer(MODEL_NAME)
    print(f"  Embedding {len(texts)} texts…")
    vecs = model.encode(texts, show_progress_bar=True, normalize_embeddings=True, batch_size=32)
    return vecs


def project(embeddings, n_components):
    import umap
    import numpy as np
    reducer = umap.UMAP(n_components=n_components, **UMAP_PARAMS)
    print(f"  UMAP {n_components}D on {embeddings.shape}…")
    return reducer.fit_transform(embeddings)


# ── Main ───────────────────────────────────────────────────────────────────────

def main():
    print("Reading terms…")
    terms = read_terms()
    print(f"  {len(terms)} terms")

    print("Reading papers…")
    papers = read_papers()
    print(f"  {len(papers)} papers")

    paper_slug_set = {p["slug"] for p in papers}

    all_texts = [t["embed_text"] for t in terms] + [p["embed_text"] for p in papers]
    n_terms = len(terms)

    print("Embedding…")
    embeddings = embed(all_texts)
    print(f"  Shape: {embeddings.shape}")

    print("Projecting (3D)…")
    coords3 = project(embeddings, 3)
    print("Projecting (2D)…")
    coords2 = project(embeddings, 2)

    # ── Build points ────────────────────────────────────────────────────────────
    points = []

    for i, t in enumerate(terms):
        x3, y3, z3 = coords3[i].tolist()
        x2, y2 = coords2[i].tolist()
        points.append({
            "id": t["slug"],
            "type": "term",
            "title": t["title"],
            "subtitle": t["subtitle"] or None,
            "is_new": t["is_new"],
            "year": None,
            "x3": round(x3, 4), "y3": round(y3, 4), "z3": round(z3, 4),
            "x2": round(x2, 4), "y2": round(y2, 4),
            "url": t["url"],
        })

    for j, p in enumerate(papers):
        i = n_terms + j
        x3, y3, z3 = coords3[i].tolist()
        x2, y2 = coords2[i].tolist()
        sub = f"{p['journal']} · {p['year']}" if p["journal"] else (str(p["year"]) if p["year"] else "")
        points.append({
            "id": p["slug"],
            "type": "paper",
            "title": p["title"],
            "subtitle": sub or None,
            "is_new": False,
            "year": p["year"],
            "abstract_short": p["abstract_short"],
            "x3": round(x3, 4), "y3": round(y3, 4), "z3": round(z3, 4),
            "x2": round(x2, 4), "y2": round(y2, 4),
            "url": p["url"],
        })

    # ── Build edges (provenance DOI slugs → paper slugs) ───────────────────────
    edges = []
    for t in terms:
        for prov in t["provenance"]:
            prov_clean = prov.strip()
            if prov_clean in paper_slug_set:
                edges.append({"source": t["slug"], "target": prov_clean, "kind": "cites"})

    atlas = {
        "points": points,
        "edges": edges,
        "stats": {"terms": len(terms), "papers": len(papers), "edges": len(edges)},
    }

    OUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUT_FILE.write_text(json.dumps(atlas, separators=(",", ":")), encoding="utf-8")
    size_kb = OUT_FILE.stat().st_size / 1024
    print(f"\nWrote {OUT_FILE.relative_to(ROOT)} ({size_kb:.1f} KB)")
    print(f"Stats: {atlas['stats']}")


if __name__ == "__main__":
    main()
