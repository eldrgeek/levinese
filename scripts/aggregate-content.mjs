#!/usr/bin/env node
// Aggregates content/papers/*.json → src/data/papers.json before each build.
// Keeps the client-side MiniSearch import working while Decap CMS edits individual files.

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const root = new URL('..', import.meta.url).pathname;
const papersDir = join(root, 'src/content/papers');
const outFile = join(root, 'src/data/papers.json');

const files = readdirSync(papersDir).filter(f => f.endsWith('.json')).sort();
const papers = files.map(f => {
  const slug = f.replace(/\.json$/, '');
  const data = JSON.parse(readFileSync(join(papersDir, f), 'utf8'));
  return { slug, ...data };
});

writeFileSync(outFile, JSON.stringify(papers, null, 2));
console.log(`Aggregated ${papers.length} papers → src/data/papers.json`);
