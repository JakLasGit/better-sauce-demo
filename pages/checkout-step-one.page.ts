import { Page, Locator } from '@playwright/test';

export class CheckoutStepOnePage {
  readonly page: Page;
  readonly title: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueToCheckoutStepTwoButton: Locator;
  readonly error: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');
    this.continueToCheckoutStepTwoButton = page.getByTestId('continue');
    this.error = page.getByTestId('error');
  }

  async fillContactDetails(firstName: string, lastName: string, postalCode: string) {
    await this.firstName.fill(firstName)
    await this.lastName.fill(lastName)
    await this.postalCode.fill(postalCode)
  }

  async continueToCheckoutStepTwo() {
    await this.continueToCheckoutStepTwoButton.click()
  }
}