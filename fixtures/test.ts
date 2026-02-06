import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page.ts';
import { InventoryPage } from '../pages/inventory.page.ts';
import { CartPage } from '../pages/cart.page.ts';
import { CheckoutStepOnePage } from '../pages/checkout-step-one.page.ts';
import { CheckoutStepTwoPage } from '../pages/checkout-step-two.page.ts';

type LoginFunction = (username: string) => Promise<void>;

type MyFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutStepOnePage: CheckoutStepOnePage
  checkoutStepTwoPage: CheckoutStepTwoPage
  loginViaCookies: LoginFunction;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutStepOnePage: async ({ page }, use) => {
    await use(new CheckoutStepOnePage(page));
  },
  checkoutStepTwoPage: async ({ page }, use) => {
    await use(new CheckoutStepTwoPage(page));
  },

  loginViaCookies: async ({ page, baseURL }, use) => {
    const loginFn = async (username: string) => {
      const domain = new URL(baseURL!).hostname;
      
      await page.context().addCookies([
        {
          name: 'session-username',
          value: username,
          domain: domain,
          path: '/',
        },
      ]);
      await page.goto('/inventory.html');
    };

    await use(loginFn);
  }
});

export { expect } from '@playwright/test';