#!/usr/bin/env python3
"""
Ingest Levin archive data into Astro content collections.
Run from: ~/Projects/Levinese/
  python3 scripts/ingest-corpus.py
"""

import json, re, sys
from pathlib import Path
from urllib.parse import urlparse

ARCHIVE = Path.home() / "Projects/SOMA/state/levin-archive"
CONTENT = Path(__file__).parent.parent / "src/content"
DATA    = Path(__file__).parent.parent / "src/data"


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def host_from_url(url):
    if not url:
        return None
    try:
        h = urlparse(url).hostname or ""
        return h.removeprefix("www.")
    except Exception:
        return None


def parse_md(text):
    """Return (title, url, date, excerpt) from Levin-archive markdown format."""
    title_m = re.search(r"^#\s+(.+)$", text, re.MULTILINE)
    title = title_m.group(1).strip() if title_m else None

    url_m = re.search(r"\*\*Source:\*\*\s*(https?://\S+)", text)
    url = url_m.group(1).rstrip(".,;)") if url_m else None

    date_m = re.search(r"\*\*Date:\*\*\s*(\d{4}-\d{2}-\d{2})", text)
    date = date_m.group(1) if date_m else None

    # Excerpt: content after the first --- separator
    parts = text.split("---", 1)
    body = parts[1] if len(parts) > 1 else text
    body = re.sub(r"!\[.*?\]\(.*?\)", "", body)    # images
    body = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", body)  # links → text
    body = re.sub(r"<[^>]+>", "", body)            # HTML
    body = re.sub(r"\*+([^*]+)\*+", r"\1", body)  # bold/italic
    body = re.sub(r"#+\s*", "", body)              # headings
    body = re.sub(r"\n{3,}", "\n\n", body)
    paras = [
        p.strip() for p in body.split("\n\n")
        if len(p.strip()) > 40
        and not re.match(r"^https?://", p.strip())
        and not re.match(r"^\[.*\]\(", p.strip())
        and p.strip().count(" ") >= 3  # must have some words
    ]
    excerpt = paras[0][:280] if paras else None

    return title, url, date, excerpt


def video_slug(vid_id: str) -> str:
    """Return a safe Astro-collection / HTML-id slug for a YouTube video ID."""
    # HTML5 IDs can start with -, but CSS selectors need escaping; avoid it
    if vid_id.startswith("-"):
        return "yt-d" + vid_id[1:]
    return "yt-" + vid_id


# ---------------------------------------------------------------------------
# Videos
# ---------------------------------------------------------------------------

def ingest_videos():
    out_dir = CONTENT / "videos"
    out_dir.mkdir(parents=True, exist_ok=True)
    src = ARCHIVE / "videos/transcripts"
    records = []  # also built for corpus.json

    for f in sorted(src.glob("*.info.json")):
        vid_id = f.name.replace(".info.json", "")
        try:
            info = json.loads(f.read_text())
        except Exception:
            continue

        ud = info.get("upload_date", "")
        date = f"{ud[:4]}-{ud[4:6]}-{ud[6:8]}" if len(ud) == 8 else None
        desc = (info.get("description") or "")[:280].strip()

        slug = video_slug(vid_id)
        record = {
            "title": info.get("title", vid_id),
            "url": info.get("webpage_url", f"https://www.youtube.com/watch?v={vid_id}"),
            "date": date,
            "platform": "youtube",
            "duration_sec": info.get("duration"),
            "transcript_chars": None,
            "excerpt": desc or None,
            "source_host": "youtube.com",
            "_vid_id": vid_id,  # kept for cross-link generation; stripped before corpus.json
        }
        (out_dir / f"{slug}.json").write_text(
            json.dumps({k: v for k, v in record.items() if not k.startswith("_")},
                       ensure_ascii=False)
        )
        records.append({"id": slug, "vid_id": vid_id, **record})

    return records


# ---------------------------------------------------------------------------
# Generic markdown collection
# ---------------------------------------------------------------------------

def ingest_md_collection(src_dir, collection_name, extra_fn=None):
    out_dir = CONTENT / collection_name
    out_dir.mkdir(parents=True, exist_ok=True)
    records = []

    for f in sorted(Path(src_dir).glob("*.md")):
        slug = f.stem
        text = f.read_text(errors="replace")
        title, url, date, excerpt = parse_md(text)

        if not title:
            title = slug.replace("-", " ").title()

        record = {
            "title": title,
            "url": url,
            "date": date,
            "excerpt": excerpt,
            "source_host": host_from_url(url),
        }

        if extra_fn:
            record.update(extra_fn(text, url, slug))

        (out_dir / f"{slug}.json").write_text(
            json.dumps({k: v for k, v in record.items() if not k.startswith("_")},
                       ensure_ascii=False)
        )
        records.append({"id": slug, **record})

    return records


def ingest_blog():
    return ingest_md_collection(
        ARCHIVE / "other/blog", "blog",
        lambda text, url, slug: {"site": host_from_url(url)},
    )


def ingest_magazine():
    def extra(text, url, slug):
        pub_m = re.search(r"\*\*Publication:\*\*\s*(.+)$", text, re.MULTILINE)
        pub = pub_m.group(1).strip() if pub_m else host_from_url(url)
        return {"publication": pub}
    return ingest_md_collection(ARCHIVE / "other/magazine", "magazine", extra)


def ingest_substack():
    return ingest_md_collection(
        ARCHIVE / "other/substack", "substack",
        lambda text, url, slug: {"substack_handle": "mlevin77"},
    )


def ingest_xposts():
    return ingest_md_collection(
        ARCHIVE / "other/x", "xposts",
        lambda text, url, slug: {"handle": "drmichaellevin", "thread_id": None},
    )


# ---------------------------------------------------------------------------
# corpus.json  (flat list for client-side MiniSearch)
# ---------------------------------------------------------------------------

def build_corpus_json(video_recs, blog_recs, magazine_recs, substack_recs, xpost_recs):
    rows = []

    def add(recs, type_tag):
        for r in recs:
            year = None
            if r.get("date"):
                m = re.match(r"(\d{4})", r["date"])
                if m:
                    year = int(m.group(1))
            rows.append({
                "id": r["id"],
                "type": type_tag,
                "title": r.get("title", ""),
                "url": r.get("url"),
                "date": r.get("date"),
                "year": year,
                "excerpt": (r.get("excerpt") or "")[:200],
                "source_host": r.get("source_host"),
                # videos only
                **({"vid_id": r["vid_id"]} if type_tag == "video" else {}),
            })

    add(video_recs, "video")
    add(blog_recs, "blog")
    add(magazine_recs, "magazine")
    add(substack_recs, "substack")
    add(xpost_recs, "xpost")

    DATA.mkdir(parents=True, exist_ok=True)
    out = DATA / "corpus-non-papers.json"
    out.write_text(json.dumps(rows, ensure_ascii=False, indent=0))
    return len(rows)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    print("Ingesting videos ...", flush=True, end=" ")
    v = ingest_videos()
    print(f"{len(v)}")

    print("Ingesting blog ...", flush=True, end=" ")
    b = ingest_blog()
    print(f"{len(b)}")

    print("Ingesting magazine ...", flush=True, end=" ")
    m = ingest_magazine()
    print(f"{len(m)}")

    print("Ingesting substack ...", flush=True, end=" ")
    s = ingest_substack()
    print(f"{len(s)}")

    print("Ingesting xposts ...", flush=True, end=" ")
    x = ingest_xposts()
    print(f"{len(x)}")

    n = build_corpus_json(v, b, m, s, x)
    print(f"corpus-non-papers.json: {n} items")

    total = len(v) + len(b) + len(m) + len(s) + len(x)
    print(f"\nTotal non-paper items: {total}")
    print("Done.")
