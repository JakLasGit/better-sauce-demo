import { Page, Locator } from '@playwright/test';
import { extractPrice } from '../utils/string.utils';

export class InventoryPage {
readonly page: Page;
  readonly sortDropdown: Locator;
  readonly inventoryItemPrice: Locator;
  readonly headerTitle: Locator;
  readonly goToCartButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.inventoryItemPrice = page.locator('.inventory_item_price');
    this.headerTitle = page.getByTestId('title')
    this.goToCartButton = page.getByTestId('shopping-cart-link')
  }

  async sortBy(option: 'lohi' | 'hilo' | 'az' | 'za') {
    await this.sortDropdown.selectOption(option);
  }

  async getAllProductPrices(): Promise<number[]> {
    await this.inventoryItemPrice.first().waitFor();
    const pricesText = await this.inventoryItemPrice.allInnerTexts();
    return pricesText.map(price => extractPrice(price));
  }

  async addProductToCart(productName: string) {
      const productButton = this.page.locator(`div.inventory_item:has-text("${productName}") button`);
      await productButton.click();
  }

  async goToCart() {
    await this.goToCartButton.click()
  }
}