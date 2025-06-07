import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import tags from '../test-data/tags.json'
import articleStructure from '../test-data/articleStructure'


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

    const response = await page.waitForResponse('*/**/api/tags');

    expect(response.status()).toBe(200);
    await expect(pm.lookAtLandingPage().sideBar).toContainText('Modified tag 1 Modified tag 2');
  });

  test('check the response structure', async ({ page }) => {
    const responseBody = await page.waitForResponse('*/**/api/articles*').then(response => {
      expect(response.status()).toBe(200);
      return response.json();
    });

    const expectedArticleStructure = {
      articles: expect.any(Array),
      articlesCount: expect.any(Number)
    };

    expect(responseBody).toEqual(expectedArticleStructure);

    if (responseBody.articles.length > 0) {
      const firstArticle = responseBody.articles[0];
        const expectedArticleObjectStructure = articleStructure
        expect(firstArticle).toEqual(expectedArticleObjectStructure);
    };
  });
});
