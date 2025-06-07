import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().getStartedPage();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
