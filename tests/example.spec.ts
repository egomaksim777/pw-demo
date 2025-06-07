import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import tags from '../test-data/tags.json'

test.describe('Test Playwright web site', () => {
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
});

test.describe('Work with API', () => {
  test.beforeEach(async ({ page }) => {
    const pm = new PageManager(page);

    await page.route('*/**/api/tags', async route => {
      await route.fulfill({
        body: JSON.stringify(tags)
      });
    });

    pm.navigateTo().conduitPage();
  });

  test('mock API', async ({ page }) => {
    const pm = new PageManager(page);

    await page.waitForResponse('*/**/api/tags');
    await expect(pm.lookAtLandingPage().sideBar).toContainText('Modified tag 1 Modified tag 2');
  });
});
