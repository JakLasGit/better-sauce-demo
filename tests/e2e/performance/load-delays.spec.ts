import { test, expect } from '../../../fixtures/test';
import { UserFactory } from '../../../factories/user.factory'; // Zakładam, że masz ten plik z poprzednich kroków

test.describe('Performance Handling', () => {

  test('Application handles slow loading for glitch user without timeout', async ({ 
    loginPage, 
    inventoryPage 
  }) => {

    const glitchUser = UserFactory.createPerformanceGlitchUser();

    await test.step('Navigate to login page', async () => {
      await loginPage.goto();
    });

    await test.step('Login as glitch user', async () => {
      await loginPage.login(glitchUser);
    });

    await test.step('Verify inventory loads despite delay', async () => {
      await expect(inventoryPage.headerTitle).toHaveText('Products', { timeout: 10000 });
      const prices = await inventoryPage.getAllProductPrices();
      expect(prices.length).toBeGreaterThan(0);
    });
  });
});