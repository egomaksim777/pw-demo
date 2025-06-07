import { Locator, Page } from "@playwright/test";

export class LandingPage {
  readonly page: Page;
  readonly sideBar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sideBar = page.locator('.sidebar');
  };
};
