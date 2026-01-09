import { test, expect } from '@playwright/test';

test('Пользователь может заказать бургер', async ({ page }) => {
  await page.goto('file:///Users/zarina/Documents/burger-order.html');
  await page.getByRole('textbox', { name: 'Имя' }).click();
  await page.getByText('Горчица').click();
  await page.getByPlaceholder('Введите ваше имя').click();
  await page.locator('#burgerType').selectOption('cheeseburger')
  await page.locator('.radio-group', {hasText: 'Большой'}).click()
  await page.getByLabel('Горчица').click();
  await page.locator('[placeholder="Введите ваше имя"]').fill('Zi')
  await page.locator('.switch-label').click()
  await page.getByText('+').click()
  await page.locator('.radio-group', {hasText: 'Картой онлайн'}).click()
  await page.getByText('Заказать бургер').click()

  await expect(page.getByText('Заказ принят')).toBeVisible();
  await expect(page.locator('#popupMessage')).toContainText('Спасибо за заказ')

});