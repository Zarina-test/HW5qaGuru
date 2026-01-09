import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';


const user = {
  email: faker.internet.email({provider: 'mail.ru'}),
  name: faker.person.firstName({length: 5}),
  password: faker.internet.password({length: 10})
}


const url = 'https://realworld.qa.guru/';

const getRegistration = async (page, name, email, password, url) => {
  
  await page.goto(url);
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).fill(user.name);
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(user.email);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(user.password);
  await page.getByRole('button', { name: 'Sign up' }).click();

};

// test('Пользователь может зарегистрироваться', async ({ page }) => {
//   getRegistration(page, user.name, user.email, user.password, url);
//   await expect(page.getByRole('navigation')).toContainText(user.name);

// });


test('Пользователь может изменить свое имя в профиле', async ({ page }) => {
  

  const jsonCopy = structuredClone(user);
  console.log(jsonCopy);
  const {name, email, password} = jsonCopy;

    
  getRegistration(page, name, email, password, url);
  await expect(page.getByRole('navigation')).toContainText(name);
  
  });