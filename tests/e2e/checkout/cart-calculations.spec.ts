import { test, expect } from '../../../fixtures/test';
import { UserFactory } from '../../../factories/user.factory';

test.describe('Checkout Calculations', () => {
  
  test('Cart totals match sum of item prices + tax', async ({ 
    loginPage, 
    inventoryPage, 
    cartPage, 
    checkoutStepOnePage, 
    checkoutStepTwoPage 
  }) => {
    
    let itemPrices: number[] = [];
    let subtotal = 0;
    let tax = 0;
    let total = 0;

    await test.step('Login as standard user', async () => {
      const user = UserFactory.createStandardUser();
      await loginPage.goto();
      await loginPage.login(user);
    });

    await test.step('Add 3 items to cart', async () => {
      await inventoryPage.addProductToCart('Sauce Labs Backpack');     // $29.99
      await inventoryPage.addProductToCart('Sauce Labs Bike Light');   // $9.99
      await inventoryPage.addProductToCart('Sauce Labs Onesie');       // $7.99
    });

    await test.step('Navigate to Checkout Overview', async () => {
      await inventoryPage.goToCart();
      await cartPage.goToCheckoutStepOne();
      await checkoutStepOnePage.fillContactDetails('Jan', 'Kowalski', '00-001');
      await checkoutStepOnePage.continueToCheckoutStepTwo();
    });

    await test.step('Retrieve financial data from UI', async () => {
      itemPrices = await checkoutStepTwoPage.getCheckoutItemPrices();
      subtotal = await checkoutStepTwoPage.getSubtotalAmount();
      tax = await checkoutStepTwoPage.getTaxAmount();
      total = await checkoutStepTwoPage.getTotalAmount();
    });

    await test.step('Verify calculations (Subtotal and Total)', async () => {
      // 1. Walidacja sumy produktów
      const calculatedSum = itemPrices.reduce((acc, price) => acc + price, 0);
      expect(subtotal, 'Subtotal should match sum of item prices').toBe(calculatedSum);

      // 2. Walidacja podatku i totala (z uwzględnieniem floatów)
      const calculatedTotal = calculatedSum + tax;
      expect(total, 'Total should match Subtotal + Tax').toBeCloseTo(calculatedTotal, 2);
    });
  });
});