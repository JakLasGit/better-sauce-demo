import { test } from '../../../fixtures/test';
import { UserFactory } from '../../../factories/user.factory';

test.describe('Login Negative Scenarios', () => {
  test('User cannot login with invalid password', async ({ loginPage }) => {
    const invalidUser = UserFactory.createInvalidUser();

    await test.step('Navigate to Login Page', async () => {
      await loginPage.goto();
    });

    await test.step('Perform Login', async () => {
      await loginPage.login(invalidUser);
    });

    //Custom Assertion!
    await test.step('Verify Inventory Page loaded', async () => {
      await loginPage.expectErrorMessage('Username and password do not match');
    });
  });

  test('User cannot login with empty fields', async ({ loginPage }) => {
    await test.step('Navigate to Login Page', async () => {
      await loginPage.goto();
    });

    await test.step('Try To Login Without Providing Credentials', async () => {
      await loginPage.loginButton.click();
    });

    await test.step('Verify Error Text', async () => {
      await loginPage.expectErrorMessage('Username is required');
    });
  });
});
