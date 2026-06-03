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
});
