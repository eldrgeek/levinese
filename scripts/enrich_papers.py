#!/usr/bin/env python3
"""
Enrich papers manifest with abstracts from Crossref/OpenAlex/EuropePMC,
plus reachability checks for each paper's DOI URL.

Writes:
  ~/Projects/SOMA/state/levin-archive/papers/manifest.enriched.jsonl
  ~/Projects/Levinese/src/data/papers.json
"""

import json
import time
import sys
import re
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import urlopen, Request
from urllib.error import URLError, HTTPError
from urllib.parse import quote
from concurrent.futures import ThreadPoolExecutor, as_completed
import ssl
import socket

MANIFEST = Path.home() / "Projects/SOMA/state/levin-archive/papers/manifest.jsonl"
OUT_MANIFEST = Path.home() / "Projects/SOMA/state/levin-archive/papers/manifest.enriched.jsonl"
OUT_JSON = Path.home() / "Projects/Levinese/src/data/papers.json"

UA = "Levinese/1.0 (mailto:mw@mike-wolf.com)"
TIMEOUT = 10
BATCH = 20

BOILERPLATE_PATTERNS = [
    r"abstract is available",
    r"abstract available at",
    r"see the article",
    r"full text available",
    r"no abstract available",
    r"publisher's note",
]


def is_boilerplate(text: str) -> bool:
    if not text:
        return True
    t = text.lower().strip()
    if len(t) < 30:
        return True
    for pat in BOILERPLATE_PATTERNS:
        if re.search(pat, t, re.IGNORECASE):
            return True
    return False


def fetch_json(url: str, retries=1) -> dict | None:
    for attempt in range(retries + 1):
        try:
            req = Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
            with urlopen(req, timeout=TIMEOUT) as resp:
                return json.loads(resp.read().decode("utf-8", errors="replace"))
        except Exception as e:
            if attempt < retries:
                time.sleep(1)
            else:
                return None
    return None


def fetch_crossref(doi: str) -> dict:
    """Returns {abstract, journal, authors, year}."""
    url = f"https://api.crossref.org/works/{quote(doi, safe='')}"
    data = fetch_json(url)
    if not data or data.get("status") != "ok":
        return {}
    msg = data.get("message", {})
    result = {}

    # Abstract
    abstract_raw = msg.get("abstract", "")
    if abstract_raw and not is_boilerplate(abstract_raw):
        # Strip JATS XML tags
        abstract = re.sub(r"<[^>]+>", " ", abstract_raw).strip()
        abstract = re.sub(r"\s+", " ", abstract)
        if not is_boilerplate(abstract):
            result["abstract"] = abstract

    # Journal
    containers = msg.get("container-title", [])
    if containers:
        result["journal"] = containers[0]

    # Authors
    authors = []
    for a in msg.get("author", [])[:10]:
        given = a.get("given", "")
        family = a.get("family", "")
        if family:
            authors.append(f"{given} {family}".strip() if given else family)
    if authors:
        result["authors"] = authors

    # Year (prefer published-print, then published-online, then issued)
    for field in ("published-print", "published-online", "issued"):
        dp = msg.get(field, {}).get("date-parts", [[]])
        if dp and dp[0]:
            result["year"] = str(dp[0][0])
            break

    # Title
    titles = msg.get("title", [])
    if titles:
        result["title"] = titles[0]

    # Type/ISSN/DOI URL
    result["doi_url"] = f"https://doi.org/{doi}"

    return result


def fetch_openalex(doi: str) -> dict:
    """Fallback for abstract + authors."""
    url = f"https://api.openalex.org/works/doi:{quote(doi, safe='')}"
    data = fetch_json(url)
    if not data:
        return {}
    result = {}

    # Abstract (inverted index → reconstruct)
    inv = data.get("abstract_inverted_index")
    if inv:
        max_pos = max(max(positions) for positions in inv.values()) + 1
        words = [""] * max_pos
        for word, positions in inv.items():
            for pos in positions:
                if pos < max_pos:
                    words[pos] = word
        abstract = " ".join(w for w in words if w).strip()
        if abstract and not is_boilerplate(abstract):
            result["abstract"] = abstract

    # Journal
    locs = data.get("primary_location") or {}
    src = locs.get("source") or {}
    if src.get("display_name"):
        result["journal"] = src["display_name"]

    # Authors
    authors = []
    for authorship in data.get("authorships", [])[:10]:
        name = authorship.get("author", {}).get("display_name", "")
        if name:
            authors.append(name)
    if authors:
        result["authors"] = authors

    # Year
    if data.get("publication_year"):
        result["year"] = str(data["publication_year"])

    return result


def fetch_europepmc(doi: str) -> dict:
    """Second fallback."""
    url = f"https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:{quote(doi)}&format=json&pageSize=1"
    data = fetch_json(url)
    if not data:
        return {}
    results = data.get("resultList", {}).get("result", [])
    if not results:
        return {}
    r = results[0]
    result = {}
    abstract = r.get("abstractText", "")
    if abstract and not is_boilerplate(abstract):
        result["abstract"] = abstract
    if r.get("journalTitle"):
        result["journal"] = r["journalTitle"]
    if r.get("authorString"):
        result["authors"] = [a.strip() for a in r["authorString"].split(",")][:10]
    return result


def check_reachability(doi: str) -> dict:
    """HEAD request to doi.org/{doi}. 200/3xx/401/403 = reachable. 404/410/timeout = not."""
    url = f"https://doi.org/{quote(doi, safe='/:@!$&\'()*+,;=')}"
    now = datetime.now(timezone.utc).isoformat()
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    try:
        req = Request(url, method="HEAD", headers={
            "User-Agent": UA,
            "Accept": "*/*",
        })
        # Don't follow redirects for HEAD — we just want to know the chain resolves
        import urllib.request
        opener = urllib.request.build_opener(urllib.request.HTTPRedirectHandler)
        # Actually let redirects follow — we want the final status
        with urlopen(req, timeout=TIMEOUT, context=ctx) as resp:
            status = resp.status
            reachable = status in range(200, 404) or status in (401, 403)
            return {"reachable": reachable, "reachable_status": status, "reachable_checked_at": now, "doi_url": url}
    except HTTPError as e:
        status = e.code
        reachable = status in (401, 403)  # auth-required but exists
        return {"reachable": reachable, "reachable_status": status, "reachable_checked_at": now, "doi_url": url}
    except (URLError, socket.timeout, TimeoutError, OSError) as e:
        return {"reachable": False, "reachable_status": 0, "reachable_checked_at": now, "doi_url": url}
    except Exception as e:
        return {"reachable": False, "reachable_status": -1, "reachable_checked_at": now, "doi_url": url}


def enrich_entry(entry: dict) -> dict:
    doi = entry.get("doi", "")
    result = dict(entry)
    meta = {}

    # Fetch metadata: Crossref first
    cr = fetch_crossref(doi)
    meta.update(cr)
    time.sleep(0.3)

    # Fill gaps with OpenAlex
    if not meta.get("abstract") or not meta.get("authors"):
        oa = fetch_openalex(doi)
        for k, v in oa.items():
            if not meta.get(k):
                meta[k] = v
        time.sleep(0.3)

    # Fill gaps with EuropePMC (only if still missing abstract)
    if not meta.get("abstract"):
        ep = fetch_europepmc(doi)
        for k, v in ep.items():
            if not meta.get(k):
                meta[k] = v
        time.sleep(0.2)

    # Reachability check
    reach = check_reachability(doi)
    meta.update(reach)
    time.sleep(0.3)

    result.update(meta)
    return result


def main():
    entries = [json.loads(l) for l in MANIFEST.read_text().splitlines() if l.strip()]
    print(f"Loaded {len(entries)} entries from manifest", flush=True)

    enriched = []
    total = len(entries)

    for i, entry in enumerate(entries):
        sys.stdout.write(f"\r  [{i+1}/{total}] {entry.get('doi', '')[:60]:<60}")
        sys.stdout.flush()
        enriched_entry = enrich_entry(entry)
        enriched.append(enriched_entry)
        # Small stagger to avoid hammering APIs
        time.sleep(0.2)

    print(f"\nDone. Writing enriched manifest...", flush=True)

    # Write enriched JSONL
    OUT_MANIFEST.write_text("\n".join(json.dumps(e) for e in enriched) + "\n")
    print(f"Written: {OUT_MANIFEST}", flush=True)

    # Write site JSON — only fields the site needs
    papers = []
    for e in enriched:
        paper = {
            "slug": e.get("slug", ""),
            "doi": e.get("doi", ""),
            "doi_url": e.get("doi_url", f"https://doi.org/{e.get('doi','')}"),
            "title": e.get("title", "Untitled"),
            "year": e.get("year", ""),
            "journal": e.get("journal", ""),
            "authors": e.get("authors", []),
            "abstract": e.get("abstract", ""),
            "pmid": e.get("pmid", ""),
            "pmc": e.get("pmc", ""),
            "reachable": e.get("reachable", False),
            "reachable_status": e.get("reachable_status", 0),
        }
        papers.append(paper)

    OUT_JSON.write_text(json.dumps(papers, indent=2, ensure_ascii=False))
    print(f"Written: {OUT_JSON}", flush=True)

    # Stats
    has_abstract = sum(1 for p in papers if p["abstract"])
    reachable = sum(1 for p in papers if p["reachable"])
    has_journal = sum(1 for p in papers if p["journal"])
    has_authors = sum(1 for p in papers if p["authors"])
    print(f"\nStats:")
    print(f"  Total: {len(papers)}")
    print(f"  With abstract: {has_abstract}")
    print(f"  Reachable: {reachable}")
    print(f"  With journal: {has_journal}")
    print(f"  With authors: {has_authors}")


if __name__ == "__main__":
    main()
