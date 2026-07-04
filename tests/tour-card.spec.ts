import { test, expect } from '@playwright/test';

test('tour card renders, opens lightbox, chapters seek, no autoplay attr, Escape closes', async ({ page }) => {
  await page.goto('/');
  const card = page.locator('#tour-card');
  await expect(card).toBeVisible();
  await card.scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'test-results/tour-card.png' });

  const video = page.locator('#tour-video');
  await expect(video).toHaveJSProperty('autoplay', false);

  await card.click();
  const box = page.locator('#tour-lightbox');
  await expect(box).toBeVisible();
  await page.screenshot({ path: 'test-results/tour-lightbox.png' });

  const chapters = page.locator('#tour-chapters button');
  await expect(chapters).toHaveCount(7);
  await expect(chapters.first()).toHaveText('What is Levinese?');
  await expect(chapters.nth(3)).toHaveText('Atlas');

  const src = await page.locator('#tour-video source').getAttribute('src');
  expect(src).toBe('/videos/levinese-visitor-walkthrough.mp4');

  await page.keyboard.press('Escape');
  await expect(box).toBeHidden();
});
