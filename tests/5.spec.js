import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/main.page';
import { RegisterPage } from '../src/pages/register.page';
import { HomePage } from '../src/pages/home.page';

const user = {
  email: faker.internet.email({provider: 'mail.ru'}),
  name: faker.person.firstName({length: 5}),
  password: faker.internet.password({length: 10})
}

const url = 'https://realworld.qa.guru/';

test('Пользователь может зарегистрироваться', async ({ page }) => {
    const {email, password, name} = user;
    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);
    const homePage = new HomePage(page);

    await mainPage.open(url);
    await mainPage.gotoRegister();
    await registerPage.register(name, email, password);

   await expect(homePage.profileName).toContainText(user.name);

});