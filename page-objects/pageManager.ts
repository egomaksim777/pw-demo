import { Page } from "@playwright/test";
import { NavigationPage } from "./navigationPage";
import { LandingPage } from "./landingPage";

export class PageManager {
  private readonly page: Page
  private readonly navigationPage: NavigationPage
  private readonly landingPage: LandingPage

  constructor(page: Page) {
    this.page = page
    this.navigationPage = new NavigationPage(this.page)
    this.landingPage = new LandingPage(this.page)
  };

  navigateTo() {
    return this.navigationPage
  };

  lookAtLandingPage() {
    return this.landingPage
  };
};
