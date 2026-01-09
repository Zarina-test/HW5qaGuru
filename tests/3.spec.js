import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

// переменные
let name = faker.person.fullName(); 
let email = faker.internet.email({provider: 'mail.ru'});
let password = faker.internet.password({length: 10});

const url = 'https://realworld.qa.guru/';

const getRegistration = async (page, name, email, password, url) => {
  
  await page.goto(url);
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).fill(name);
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Sign up' }).click();

};

test('Пользователь может зарегистрироваться', async ({ page }) => {
  getRegistration(page, name, email, password, url);
  await expect(page.getByRole('navigation')).toContainText(name);

});


test('Пользователь может изменить свое имя в профиле', async ({ page }) => {
    
    getRegistration(page, name, email, password, url);
    await expect(page.getByRole('navigation')).toContainText(name);
  
  });