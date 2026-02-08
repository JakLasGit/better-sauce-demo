import { test, expect } from '@playwright/test';

/*
ANTI-PATTERN EXAMPLE
Ten plik istnieje celowo, aby pokazać różnicę między "Spaghetti Code" a architekturą POM.
Problemy w tym kodzie:
 * 1. Hardcoded selektory (zmiana UI = zmiana w każdym teście)
 * 2. Brak reużywalności (logowanie kopiowane wszędzie)
 * 3. Nieczytelny przebieg (tech jargon zamiast biznesu)
 * 4. Hardcoded waits (timeouty)
 */
test('Spaghetti Login Test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  
  await expect(page.locator('.title')).toHaveText('Products');
});