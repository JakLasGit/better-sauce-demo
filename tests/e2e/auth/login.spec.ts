import { test, expect } from '../../../fixtures/test';
import { UserFactory } from '../../../factories/user.factory';

test.describe('Authentication', () => {
  
  test('Standard user handles successful login', async ({ loginPage, inventoryPage }) => {
    const user = UserFactory.createStandardUser();

    await test.step('Navigate to Login Page', async () => {
      await loginPage.goto();
    });

    await test.step('Perform Login', async () => {
      await loginPage.login(user);
    });

    await test.step('Verify Inventory Page loaded', async () => {
      await expect(inventoryPage.headerTitle).toHaveText('Products');
    });
  });

  test('Locked out user sees error message', async ({ loginPage }) => {
    const lockedUser = UserFactory.createLockedUser();

    await loginPage.goto();
    await loginPage.login(lockedUser);

    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out.');
  });
});