import { test, expect } from '@playwright/test';

const visibleRows = async (page: import('@playwright/test').Page) =>
  page.$$eval('.corpus-row', rows => rows.filter(r => (r as HTMLElement).style.display !== 'none').length);

test.describe('corpus search + filter', () => {
  test('free-text search actually filters the visible list', async ({ page }) => {
    await page.goto('/corpus/');
    // result count populated => the page module executed (regression guard for
    // the Netlify-widget CORS import that used to abort the whole script).
    await expect(page.locator('#result-count')).not.toHaveText('', { timeout: 8000 });

    const total = await visibleRows(page);
    expect(total).toBeGreaterThan(500);

    await page.fill('#search-input', 'bioelectric');
    await expect.poll(async () => visibleRows(page)).toBeLessThan(total);
    const filtered = await visibleRows(page);
    expect(filtered).toBeGreaterThan(0);
    await expect(page.locator('#result-count')).toContainText(/Showing \d+ of/);
  });

  test('type filter chip narrows to a single type', async ({ page }) => {
    await page.goto('/corpus/');
    await expect(page.locator('#result-count')).not.toHaveText('', { timeout: 8000 });

    await page.locator('.filter-chip[data-filter="video"]').click();
    await expect.poll(async () =>
      page.$$eval('.corpus-row', rows => {
        const vis = rows.filter(r => (r as HTMLElement).style.display !== 'none');
        return new Set(vis.map(r => (r as HTMLElement).dataset.type)).size === 1
          && vis.length > 0
          && (vis[0] as HTMLElement).dataset.type === 'video';
      })
    ).toBe(true);
  });

  test('search + chip combine', async ({ page }) => {
    await page.goto('/corpus/');
    await expect(page.locator('#result-count')).not.toHaveText('', { timeout: 8000 });
    await page.fill('#search-input', 'bioelectric');
    await page.locator('.filter-chip[data-filter="paper"]').click();
    await expect.poll(async () =>
      page.$$eval('.corpus-row', rows =>
        rows.filter(r => (r as HTMLElement).style.display !== 'none')
            .every(r => (r as HTMLElement).dataset.type === 'paper'))
    ).toBe(true);
  });
});

test.describe('corpus anchor cross-link: scroll to center + highlight', () => {
  // Use a paper with a short abstract so the row stays compact on mobile too.
const SLUG = '10-1126-scirobotics-abf1571';

  test('linked entry highlights (Wikipedia-style)', async ({ page }) => {
    await page.goto(`/corpus/#${SLUG}`);
    // highlight is added shortly after load and removed after ~2.4s; catch it.
    await expect.poll(
      async () => page.evaluate(s => document.getElementById(s)?.classList.contains('corpus-highlight'), SLUG),
      { timeout: 4000, intervals: [50] }
    ).toBe(true);
  });

  test('linked entry scrolls toward the middle of the viewport (not under the sticky header)', async ({ page }, testInfo) => {
    await page.goto(`/corpus/#${SLUG}`);
    // let the smooth-scroll settle
    await page.waitForTimeout(1200);

    const m = await page.evaluate(s => {
      const el = document.getElementById(s)!;
      const r = el.getBoundingClientRect();
      const controls = document.getElementById('controls')!;
      const headerBottom = 56 + controls.offsetHeight;
      return {
        center: r.top + r.height / 2,
        vh: window.innerHeight,
        rowTop: r.top,
        rowHeight: r.height,
        headerBottom,
      };
    }, SLUG);

    // Not hidden beneath the sticky search header.
    expect(m.rowTop, 'entry top should clear the sticky header').toBeGreaterThan(m.headerBottom - 4);
    // Roughly centered: within 35% of viewport height of the exact middle.
    // For rows taller than the viewport the center will naturally be below mid —
    // in that case we just verify the top cleared the header (checked above).
    if (m.rowHeight < m.vh * 0.9) {
      const distFromCenter = Math.abs(m.center - m.vh / 2);
      expect(distFromCenter, `dist from center on ${testInfo.project.name}`).toBeLessThan(m.vh * 0.35);
    }
  });
});

test.describe('video entries have dual links (video + transcript)', () => {
  test('a video row links to the clip and a transcript', async ({ page }) => {
    await page.goto('/corpus/?type=video');
    await expect(page.locator('#result-count')).not.toHaveText('', { timeout: 8000 });

    const row = page.locator('.corpus-row[data-type="video"]').first();
    await expect(row).toBeVisible();

    // Link to the video itself.
    const watch = row.getByRole('link', { name: /watch video/i });
    await expect(watch).toHaveAttribute('href', /youtube\.com|youtu\.be/);

    // Link to a transcript (here: the coming-soon placeholder until backfilled).
    const transcript = row.locator('a[data-transcript]');
    await expect(transcript).toBeVisible();
    await expect(transcript).toHaveAttribute('href', /\/transcript-coming-soon\/|\/transcripts\//);
  });
});
