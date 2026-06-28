---
district: thinker-sites
status: active
depends_on: [SOMA]
capabilities: [astro, netlify, auth, supabase]
last_reviewed: 2026-06-23
---

# Levinese — a field guide to Michael Levin's ideas (Astro site translating his corpus for a general audience)

**Where work happens:** `src/content/{papers,videos,terms,xposts,...}` (the corpus) · `src/pages/` + `src/layouts/` · `public/levinese-guide-config.js` (the SOMA Guide persona, an AI guide grounded in Levin's corpus — never impersonating him) · `scripts/` (`aggregate-content.mjs` runs at build; `ingest-corpus.py`, `build_atlas.py`, `enrich_papers.py`)

**Key docs**
- [README via package.json scripts] — `npm run build` = aggregate-content + `astro build`; `npm test` = build + Playwright.

**Skills**
- gap: corpus ingest pipeline (`ingest-corpus.py` → collections + `build_atlas.py`) is the reusable thinker-site spine; should become a local skill (Friston/Fields will reuse it).

**Depends on / used by:** template/source for `Joscha`, `agi-2026` per-thinker subsites. Guide widget + SomaAuth visitor auth come from SOMA. Ask backend is an external Cloudflare tunnel (see `.env`).

**Gotchas**
- Build is two-step: `aggregate-content.mjs` must run before `astro build` (the `build` script does this; bare `astro build` ships stale data).
- `.env` holds the live `PUBLIC_LEVIN_ASK_*` Cloudflare-tunnel token — public-prefixed but still a secret; tunnel URL is ephemeral.
- `/papers` is retired → 301 to `/corpus` (canonical) in `netlify.toml`; don't reintroduce `/papers` links.
