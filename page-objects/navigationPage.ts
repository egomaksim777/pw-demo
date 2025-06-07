import { Locator, Page } from "@playwright/test";

export class NavigationPage {
  readonly page: Page;
  readonly getStartedLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
  };

  async getStartedPage() {
    await this.getStartedLink.click();
  }
};
