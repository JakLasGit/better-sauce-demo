import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly backpackCartLinkButton: Locator;
  readonly bikeLightCartLinkButton: Locator;
  readonly boltTshirtCartLinkButton: Locator;
  readonly jacketCartLinkButton: Locator;
  readonly onesieCartLinkButton: Locator;
  readonly redShirtCartLinkButton: Locator;
  readonly goToCheckoutStepOneButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backpackCartLinkButton = page.getByTestId('item-4-title-link');
    this.bikeLightCartLinkButton = page.getByTestId('item-0-title-link');
    this.boltTshirtCartLinkButton = page.getByTestId('item-1-title-link');
    this.jacketCartLinkButton = page.getByTestId('item-5-title-link');
    this.onesieCartLinkButton = page.getByTestId('item-2-title-link');
    this.redShirtCartLinkButton = page.getByTestId('item-3-title-link');
    this.goToCheckoutStepOneButton = page.getByTestId('checkout');
  }

  async goToCheckoutStepOne() {
    await this.goToCheckoutStepOneButton.click()
  }
}