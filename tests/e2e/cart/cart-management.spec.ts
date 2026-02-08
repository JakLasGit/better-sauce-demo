import { test, expect } from '../../../fixtures/test';
import { UserFactory } from '../../../factories/user.factory';

test.describe('Cart Management', () => {

  test('User can add and remove items from the cart', async ({ loginPage, inventoryPage, page }) => {
    
    await test.step('Login', async () => {
      const user = UserFactory.createStandardUser();
      await loginPage.goto();
      await loginPage.login(user);
    });

    await test.step('Add product and verify badge shows 1', async () => {
      await inventoryPage.addProductToCart('Sauce Labs Backpack');
      await expect(inventoryPage.cartIconBadge).toHaveText('1');
    });

    await test.step('Remove product and verify badge is gone', async () => {
      await inventoryPage.removeProduct('Sauce Labs Backpack');
      
      await expect(inventoryPage.cartIconBadge).toBeHidden();
    });
  });
});