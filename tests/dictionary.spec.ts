import { test, expect } from '@playwright/test';

test.describe('dictionary filter + cross-links', () => {
  test('term filter actually narrows the visible entries', async ({ page }) => {
    await page.goto('/dictionary/');
    const total = await page.locator('.dict-entry').count();
    expect(total).toBeGreaterThan(20);

    await page.fill('#dict-search', 'memory');
    // count label updates (regression guard for the page-module-abort bug)
    await expect(page.locator('#dict-count')).toContainText(/Showing \d+ of/, { timeout: 8000 });

    const shown = await page.$$eval('.dict-entry', els => els.filter(e => !(e as HTMLElement).hidden).length);
    expect(shown).toBeGreaterThan(0);
    expect(shown).toBeLessThan(total);
  });

  test('clearing the filter restores all entries', async ({ page }) => {
    await page.goto('/dictionary/');
    const total = await page.locator('.dict-entry').count();
    await page.fill('#dict-search', 'zzzznomatch');
    await expect(page.locator('#dict-empty')).toBeVisible();
    await page.fill('#dict-search', '');
    await expect.poll(async () =>
      page.$$eval('.dict-entry', els => els.filter(e => !(e as HTMLElement).hidden).length)
    ).toBe(total);
  });

  test('source citations link BOTH the title and the DOI to /corpus', async ({ page }) => {
    await page.goto('/dictionary/');

    const titleLink = page.locator('a.paper-link').first();
    const doiLink = page.locator('a.paper-doi-link').first();

    await expect(titleLink).toBeVisible();
    await expect(doiLink).toBeVisible();

    // both clickable, both cross-link into the corpus (never the retired /papers)
    await expect(titleLink).toHaveAttribute('href', /^\/corpus#/);
    await expect(doiLink).toHaveAttribute('href', /^\/corpus#/);

    // counts should match: every linked title also gets a DOI link
    const titles = await page.locator('a.paper-link').count();
    const dois = await page.locator('a.paper-doi-link').count();
    expect(dois).toBe(titles);
  });

  test('no source citation still points at the retired /papers route', async ({ page }) => {
    await page.goto('/dictionary/');
    const stalePapers = await page.locator('a[href^="/papers#"]').count();
    expect(stalePapers).toBe(0);
  });

  for (const view of ['', '?view=plain']) {
    test(`search matches definition text and ranks title hits first ${view}`, async ({ page }) => {
      await page.goto('/dictionary/' + view);
      // The magnifier is a working control, not decoration.
      await page.click('#dict-search-go');
      await expect(page.locator('#dict-search')).toBeFocused();
      const box = await page.locator('#dict-search').boundingBox();
      expect(box!.width).toBeGreaterThan(300);

      // "flatworm" appears in definitions only, never in a title.
      await page.keyboard.type('flatworm');
      const bodyHits = page.locator('#dict-results .dict-entry:not([hidden])');
      await expect(bodyHits.first()).toBeVisible();

      // "planarian" is in two titles and many bodies; the title hits come first.
      await page.fill('#dict-search', 'PLANARIAN');
      const order = await page.$$eval('#dict-results .dict-entry:not([hidden])',
        els => els.map(e => (e as HTMLElement).dataset.title!.includes('planarian')));
      expect(order.length).toBeGreaterThan(2);
      expect(order.indexOf(false)).toBeGreaterThan(order.lastIndexOf(true));
    });
  }
});
