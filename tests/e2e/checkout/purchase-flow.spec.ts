import { test, expect } from '../../../fixtures/test';

test.describe('E2E Purchase Flow', () => {

  test('Standard user can complete the purchase flow', async ({ 
    page, 
    loginViaCookies, 
    inventoryPage, 
    cartPage, 
    checkoutStepOnePage, 
    checkoutStepTwoPage,
    successPage 
  }) => {
    
    await test.step('Login via Cookies', async () => {
        await loginViaCookies('standard_user');
    })

    await test.step('Add products to cart', async () => {
      await inventoryPage.addProductToCart('Sauce Labs Backpack');
      await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    });

    await test.step('Navigate to checkout', async () => {
      await inventoryPage.goToCart();
      await cartPage.goToCheckoutStepOne();
    });

    await test.step('Fill contact details', async () => {
      await checkoutStepOnePage.fillContactDetails('Jan', 'Kowalski', '00-001');
      await checkoutStepOnePage.continueToCheckoutStepTwo();
    });

    await test.step('Verify summary and finish order', async () => {
      const total = await checkoutStepTwoPage.getTotalAmount();
      expect(total).toBeGreaterThan(0);

      await checkoutStepTwoPage.finishOrder();
    });

    await test.step('Verify order completion', async () => {
      await expect(successPage.completeHeader).toContainText('Thank you for your order');
      await expect(page).toHaveURL(/.*checkout-complete/);
    });
  });
});