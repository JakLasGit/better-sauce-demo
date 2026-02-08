import { test, expect } from '../../../fixtures/test';

test.describe('Checkout Form Validation', () => {

  test('User cannot continue to checkout step two without filling details', async ({ 
    page, 
    loginViaCookies, 
    inventoryPage, 
    cartPage, 
    checkoutStepOnePage 
  }) => {
    
    await test.step('Go to checkout step one', async () => {
      await loginViaCookies('standard_user');
      await inventoryPage.addProductToCart('Sauce Labs Backpack'); // Musi być coś w koszyku
      await inventoryPage.goToCart();
      await cartPage.goToCheckoutStepOne();
    })

    await test.step('Try to continue with empty form', async () => {
      await checkoutStepOnePage.continueToCheckoutStepTwo();
    });

    await test.step('Verify error message for missing First Name', async () => {
      await expect(checkoutStepOnePage.error).toBeVisible();
      await expect(checkoutStepOnePage.error).toContainText('Error: First Name is required');
    });

    await test.step('Verify error message for missing Last Name', async () => {
        await checkoutStepOnePage.firstName.fill('Jan');
        await checkoutStepOnePage.continueToCheckoutStepTwo();
        await expect(checkoutStepOnePage.error).toContainText('Error: Last Name is required');
    });
  });
});