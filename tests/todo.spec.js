import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.locator('body').click();
  await page.goto('https://todomvc.com/examples/vue/dist/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Скажи-ка дядя ведь не даром');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await expect(page.getByText('Скажи-ка дядя ведь не даром')).toBeVisible();
  await page.locator('html').click();
  await expect(page.locator('html')).toBeVisible();
  await expect(page.getByRole('link', { name: 'All' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Active' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Completed' })).toBeVisible();
});