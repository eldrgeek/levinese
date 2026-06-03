import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const ROUTES = [
  '/',
  '/dictionary/',
  '/corpus/',
  '/atlas/',
  '/browse/',
  '/ask/',
  '/colophon/',
  '/transcript-coming-soon/',
];

for (const route of ROUTES) {
  test(`route ${route} returns 200`, async ({ page }) => {
    const resp = await page.goto(route);
    expect(resp, `no response for ${route}`).toBeTruthy();
    expect(resp!.status(), `status for ${route}`).toBe(200);
  });
}

test('transcript-coming-soon page shows a "Coming soon" message', async ({ page }) => {
  await page.goto('/transcript-coming-soon/');
  await expect(page.getByRole('heading', { name: /coming soon/i })).toBeVisible();
});

// The /papers -> /corpus 301 is enforced at the Netlify edge (a CDN feature that
// astro preview does not emulate). We verify the production redirect config is
// present and correct (status 301, target /corpus).
test('netlify.toml declares /papers -> /corpus 301 redirects', () => {
  const toml = readFileSync(join(__dirname, '..', 'netlify.toml'), 'utf8');

  // Three rules: /papers, /papers/, /papers/*  — all 301 to a /corpus target.
  const blocks = toml.split('[[redirects]]').slice(1);
  const papersRules = blocks.filter(b => /from\s*=\s*"\/papers/.test(b));
  expect(papersRules.length, 'expected /papers redirect rules').toBeGreaterThanOrEqual(3);

  for (const rule of papersRules) {
    expect(rule, 'papers rule must target /corpus').toMatch(/to\s*=\s*"\/corpus/);
    expect(rule, 'papers rule must be 301').toMatch(/status\s*=\s*301/);
  }
});

// No internal link should still point at the retired /papers anchor route —
// they must cross-link directly to /corpus so the scroll+highlight fires.
test('atlas.json contains no legacy /papers# urls', () => {
  const atlas = JSON.parse(readFileSync(join(__dirname, '..', 'src/data/atlas.json'), 'utf8'));
  const stale = atlas.points.filter((p: any) => typeof p.url === 'string' && p.url.includes('/papers#'));
  expect(stale, 'atlas points should not link to /papers#').toHaveLength(0);
});
