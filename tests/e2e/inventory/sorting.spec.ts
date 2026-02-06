import { test, expect } from '../../../fixtures/test';
import { UserFactory } from '../../../factories/user.factory';

test.describe('Inventory Sorting', () => {
  
  test('User can sort products by Price (low to high)', async ({ loginPage, inventoryPage }) => {
    // 1. Arrange
    const user = UserFactory.createStandardUser();
    await loginPage.goto();
    await loginPage.login(user);

    // 2. Act
    await inventoryPage.sortBy('lohi');

    // 3. Assert
    const prices = await inventoryPage.getAllProductPrices();

    const sortedPrices = [...prices].sort((a, b) => a - b);

    console.log('UI Prices:', prices);
    console.log('Expected:', sortedPrices);

    expect(prices).toEqual(sortedPrices);
  });

    test('User logged through cookie can sort products by Price (high to low)', async ({ inventoryPage, loginViaCookies }) => {
    await loginViaCookies('standard_user')

    await inventoryPage.sortBy('hilo');

    const prices = await inventoryPage.getAllProductPrices();
    const sortedPrices = [...prices].sort((a, b) => b - a); // Odwrócone sortowanie

    expect(prices).toEqual(sortedPrices);
  });
});