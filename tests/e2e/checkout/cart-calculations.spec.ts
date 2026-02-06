import { test, expect } from '../../../fixtures/test';
import { UserFactory } from '../../../factories/user.factory';

test.describe('Checkout Calculations', () => {
  
  test('Cart totals match sum of item prices + tax', async ({ loginPage, inventoryPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage }) => {
    // 1. Arrange & Login
    const user = UserFactory.createStandardUser();
    await loginPage.goto();
    await loginPage.login(user);

    // 2. Add multiple items
    await inventoryPage.addProductToCart('Sauce Labs Backpack');     // $29.99
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');   // $9.99
    await inventoryPage.addProductToCart('Sauce Labs Onesie');       // $7.99
    await inventoryPage.goToCart();
    
    await cartPage.goToCheckoutStepOne();
 
    await checkoutStepOnePage.fillContactDetails('Jan', 'Kowalski', '00-001');
    await checkoutStepOnePage.continueToCheckoutStepTwo();

    // 3. Act - Pobierz dane finansowe z ekranu
    const itemPrices = await checkoutStepTwoPage.getCheckoutItemPrices();
    const subtotal = await checkoutStepTwoPage.getSubtotalAmount();
    const tax = await checkoutStepTwoPage.getTaxAmount();
    const total = await checkoutStepTwoPage.getTotalAmount();

    // 4. Logic & Assertions
    
    // Asercja 1: Czy suma cen produktów równa się "Item Total"
    // reduce() zamiast pisać pętli które sumuje ceny
    const calculatedSum = itemPrices.reduce((acc, price) => acc + price, 0);
    expect(subtotal).toBe(calculatedSum);

    // Asercja 2: Czy Item Total + Tax = Total
    const calculatedTotal = calculatedSum + tax;
    
    // Sprawdza z dokładnością do 2 miejsc po przecinku, JS ma problemy z floatami
    expect(total).toBeCloseTo(calculatedTotal, 2); 
  });
});