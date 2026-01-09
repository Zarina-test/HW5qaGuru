import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { App } from '../src/pages/app.page';
import { UserBuilder } from '../src/builders/index';


const url = 'https://realworld.qa.guru/';

test('Пользователь может зарегистрироваться', async ({ page }) => {
    await allure.tms('TMS-456', 'Related TMS issue');
    const user = new UserBuilder().withEmail().withName().withPassword().build();
    const app = new App(page);
    const {email, password, name} = user;

    await app.main.open(url);
    await app.main.gotoRegister();
    await app.register.register(name, email, password);

   await expect(app.home.profileName).toContainText(user.name);

});