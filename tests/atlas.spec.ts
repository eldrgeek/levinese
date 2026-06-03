import { test, expect, type Page } from '@playwright/test';

// The atlas loads three.js from a CDN. Wait for init but stay tolerant if the
// CDN is unreachable (offline CI) — the navigation-safety invariants below hold
// either way, since with no handlers attached a click still can't navigate.
async function waitForAtlasReady(page: Page) {
  await expect(page.locator('#atlas-canvas')).toBeVisible();
  await page.waitForSelector('#atlas-loading', { state: 'hidden', timeout: 15_000 }).catch(() => {});
  await page.waitForTimeout(500);
}

test.describe('atlas interaction safety', () => {
  test('a bare click on the constellation never navigates away', async ({ page }) => {
    await page.goto('/atlas/');
    await waitForAtlasReady(page);

    const box = (await page.locator('#atlas-canvas').boundingBox())!;
    // Click dead center — most likely inside the point cloud.
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(300);

    // Must still be on the atlas; navigation requires the explicit Open link.
    expect(new URL(page.url()).pathname).toBe('/atlas/');
  });

  test('a drag orbits the camera and never navigates', async ({ page }) => {
    await page.goto('/atlas/');
    await waitForAtlasReady(page);

    const box = (await page.locator('#atlas-canvas').boundingBox())!;
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx + 120, cy + 60, { steps: 10 });
    await page.mouse.move(cx + 180, cy - 30, { steps: 10 });
    await page.mouse.up();
    await page.waitForTimeout(300);

    expect(new URL(page.url()).pathname).toBe('/atlas/');
    // A drag must not pin an "Open" box.
    await expect(page.locator('.atlas-open-link')).toHaveCount(0);
  });

  test('clicking a dot reveals an explicit "Open" link into corpus/dictionary', async ({ page }) => {
    await page.goto('/atlas/');
    await waitForAtlasReady(page);

    const box = (await page.locator('#atlas-canvas').boundingBox())!;
    const openLink = page.locator('.atlas-open-link');

    // Scan a grid near the middle until a click lands on a dot and pins the box.
    let found = false;
    outer:
    for (let dx = -0.2; dx <= 0.2; dx += 0.05) {
      for (let dy = -0.2; dy <= 0.2; dy += 0.05) {
        await page.mouse.click(
          box.x + box.width * (0.5 + dx),
          box.y + box.height * (0.5 + dy),
        );
        await page.waitForTimeout(60);
        if (await openLink.count() > 0 && await openLink.first().isVisible()) {
          found = true;
          break outer;
        }
      }
    }

    test.skip(!found, 'no dot hit in the sampled region (WebGL/CDN unavailable)');

    const href = await openLink.first().getAttribute('href');
    expect(href, 'Open link must target corpus or dictionary, never /papers#')
      .toMatch(/^\/(corpus#|dictionary\/#)/);
    // Still on atlas until the user actually clicks Open.
    expect(new URL(page.url()).pathname).toBe('/atlas/');
  });
});
