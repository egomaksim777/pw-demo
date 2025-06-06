import { Locator, Page } from "@playwright/test";

export class NavigationPage {
  readonly page: Page;
  readonly someLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.someLink = page.getByText('Some page');
  };

  async somePage() {
    await this.someLink.click();
  }
};
