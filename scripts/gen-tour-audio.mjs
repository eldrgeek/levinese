#!/usr/bin/env node
/**
 * gen-tour-audio.mjs  —  Pre-generate TTS audio clips for all Levinese walkthrough narrations.
 *
 * Usage:    node scripts/gen-tour-audio.mjs
 * Output:   public/audio/tour/<hash>.mp3  (served at /audio/tour/<hash>.mp3)
 *
 * Reads narrations from public/levinese-guide-config.js, computes stable 8-char hex
 * hashes per (voiceAgentId + '|' + narration), fetches TTS from the bill-talk proxy,
 * and saves each clip as a static .mp3.
 *
 * Idempotent: clips whose <hash>.mp3 already exists are skipped.
 * Hash function is identical to SomaGuide.prototype._tourAudioHash in soma-guide.js.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createContext, runInNewContext } from 'node:vm';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const ROOT = join(__dirname, '..');

/* ── Hash function (MUST match SomaGuide.prototype._tourAudioHash in soma-guide.js) ── */
function tourAudioHash(agentId, narration) {
  const s = (agentId || '') + '|' + (narration || '');
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (((h << 5) + h) ^ s.charCodeAt(i)) | 0;
  }
  return ('0000000' + (h >>> 0).toString(16)).slice(-8);
}

/* ── Load config via vm sandbox (window.SomaGuideConfig = {...} syntax) ── */
const configSrc = readFileSync(join(ROOT, 'public', 'levinese-guide-config.js'), 'utf8');
const ctx = { window: {} };
runInNewContext(configSrc, ctx);
const cfg = ctx.window.SomaGuideConfig;
if (!cfg) {
  console.error('ERROR: Could not load SomaGuideConfig from public/levinese-guide-config.js');
  process.exit(1);
}

const agentId   = cfg.voiceAgentId;
const proxyBase = cfg.ttsProxyUrl;

/* ── Collect all narrations (dedup by hash) ── */
const narrations = []; // [{ text, hash }]
const seen = new Set();

for (const wt of (cfg.walkthroughs || [])) {
  for (const step of (wt.steps || [])) {
    if (step.narration) {
      const hash = tourAudioHash(agentId, step.narration);
      if (!seen.has(hash)) { seen.add(hash); narrations.push({ text: step.narration, hash }); }
    }
    for (const sub of (step.substeps || [])) {
      if (sub.narration) {
        const hash = tourAudioHash(agentId, sub.narration);
        if (!seen.has(hash)) { seen.add(hash); narrations.push({ text: sub.narration, hash }); }
      }
    }
  }
}

console.log(`Found ${narrations.length} unique narration(s) to generate.\n`);

/* ── Ensure output directory exists ── */
const outDir = join(ROOT, 'public', 'audio', 'tour');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

/* ── Generate clips ── */
let generated = 0, skipped = 0, failed = 0;
const failures = [];

for (const { text, hash } of narrations) {
  const outPath = join(outDir, hash + '.mp3');

  if (existsSync(outPath)) {
    console.log(`  SKIP ${hash} (already exists)`);
    skipped++;
    continue;
  }

  const url = proxyBase +
    '?action=tts' +
    '&text=' + encodeURIComponent(text) +
    '&agent_id=' + encodeURIComponent(agentId);

  process.stdout.write(`  Fetching ${hash} — "${text.slice(0, 60)}${text.length > 60 ? '…' : ''}" ... `);

  try {
    const res = await fetch(url);
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.log(`FAIL (HTTP ${res.status})`);
      if (body) console.log(`    Response: ${body.slice(0, 200)}`);
      failures.push({ hash, text: text.slice(0, 80), reason: `HTTP ${res.status}` });
      failed++;
      continue;
    }
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('audio') && !contentType.includes('octet-stream')) {
      const body = await res.text().catch(() => '(binary)');
      console.log(`FAIL (unexpected content-type: ${contentType})`);
      console.log(`    Body: ${body.slice(0, 200)}`);
      failures.push({ hash, text: text.slice(0, 80), reason: `unexpected content-type: ${contentType}` });
      failed++;
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 1000) {
      console.log(`FAIL (suspiciously small: ${buf.length} bytes)`);
      failures.push({ hash, text: text.slice(0, 80), reason: `only ${buf.length} bytes` });
      failed++;
      continue;
    }
    writeFileSync(outPath, buf);
    console.log(`OK (${(buf.length / 1024).toFixed(1)} KB)`);
    generated++;
  } catch (e) {
    console.log(`FAIL (${e.message})`);
    failures.push({ hash, text: text.slice(0, 80), reason: e.message });
    failed++;
  }
}

/* ── Summary ── */
console.log('\n── Summary ──────────────────────────────');
console.log(`  Generated : ${generated}`);
console.log(`  Skipped   : ${skipped}  (already existed)`);
console.log(`  Failed    : ${failed}`);
if (failures.length > 0) {
  console.log('\n  Failed clips:');
  for (const f of failures) {
    console.log(`    [${f.hash}] "${f.text}" — ${f.reason}`);
  }
  process.exit(1);
}
console.log('\nDone. Commit the new .mp3 files in public/audio/tour/.');
