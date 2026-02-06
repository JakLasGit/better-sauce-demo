import { Page, Locator } from '@playwright/test';
import { extractPrice } from '../utils/string.utils';

export class CheckoutStepTwoPage {
  readonly page: Page;
  readonly summarySubtotal: Locator;
  readonly summaryTax: Locator;
  readonly summaryTotal: Locator;
  readonly itemPrices: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.summarySubtotal = page.getByTestId('subtotal-label');
    this.summaryTax = page.getByTestId('tax-label');
    this.summaryTotal = page.getByTestId('total-label');
    this.itemPrices = page.locator('.inventory_item_price');
    this.finishButton = page.getByTestId('finish');
  }

  // Zwraca ceny poszczególnych produktów w podsumowaniu
  async getCheckoutItemPrices(): Promise<number[]> {
    const prices = await this.itemPrices.allInnerTexts();
    return prices.map(p => extractPrice(p));
  }

  async getSubtotalAmount(): Promise<number> {
    const text = await this.summarySubtotal.innerText();
    return extractPrice(text);
  }

  async getTaxAmount(): Promise<number> {
    const text = await this.summaryTax.innerText();
    return extractPrice(text);
  }

  async getTotalAmount(): Promise<number> {
    const text = await this.summaryTotal.innerText();
    return extractPrice(text);
  }
  
  async finishOrder() {
      await this.finishButton.click();
  }
}