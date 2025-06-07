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

    const response = await page.waitForResponse('*/**/api/tags');

    expect(response.status()).toBe(200);
    await expect(pm.lookAtLandingPage().sideBar).toContainText('Modified tag 1 Modified tag 2');
  });

  test('check the response structure', async ({ page }) => {
    // const response = await page.waitForResponse('*/**/api/articles*');
    // expect(response.status()).toBe(200);

  const responseBody = await page.waitForResponse('*/**/api/articles*').then(response => response.json());

  // Define the expected structure for an article object
  const expectedArticleStructure = {
    articles: expect.any(Array),
    articlesCount: expect.any(Number)
  };

  expect(responseBody).toEqual(expectedArticleStructure);

  // Optionally, you can also validate the structure of the first article
  if (responseBody.articles.length > 0) {
    const firstArticle = responseBody.articles[0];
      const expectedArticleObjectStructure = {
        slug: expect.any(String),
        title: expect.any(String),
        description: expect.any(String),
        body: expect.any(String),
        tagList: expect.any(Array),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        favorited: expect.any(Boolean),
        favoritesCount: expect.any(Number),
        author: {
          username: expect.any(String),
          bio: null,
          image: expect.any(String),
          following: expect.any(Boolean),
        },
      };
      expect(firstArticle).toEqual(expectedArticleObjectStructure);
  };
  });
});
