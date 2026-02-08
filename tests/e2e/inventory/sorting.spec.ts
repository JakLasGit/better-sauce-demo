import { test, expect } from '../../../fixtures/test';
import { UserFactory } from '../../../factories/user.factory';

test.describe('Inventory Sorting', () => {
  test('User can sort products by Price (low to high)', async ({ loginPage, inventoryPage }) => {
    await test.step('Login as standard user', async () => {
      const user = UserFactory.createStandardUser();
      await loginPage.goto();
      await loginPage.login(user);
    });

    await test.step('Sort items by Price (low to high)', async () => {
      await inventoryPage.sortBy('lohi');
    });

    await test.step('Verify items are sorted in ascending order', async () => {
      const prices = await inventoryPage.getAllProductPrices();

      // Tworzymy kopię tablicy i sortujemy ją "idealnie" w kodzie (a - b)
      const sortedPrices = [...prices].sort((a, b) => a - b);

      console.log('UI Prices:', prices);
      console.log('Expected:', sortedPrices);

      expect(prices).toEqual(sortedPrices);
    });
  });

  test('User logged through cookie can sort products by Price (high to low)', async ({
    inventoryPage,
    loginViaCookies,
  }) => {
    await test.step('Login via cookies', async () => {
      await loginViaCookies('standard_user');
    });

    await test.step('Sort items by Price (high to low)', async () => {
      await inventoryPage.sortBy('hilo');
    });

    await test.step('Verify items are sorted in descending order', async () => {
      const prices = await inventoryPage.getAllProductPrices();

      // Sortowanie malejące (b - a)
      const sortedPrices = [...prices].sort((a, b) => b - a);

      expect(prices).toEqual(sortedPrices);
    });
  });
});
