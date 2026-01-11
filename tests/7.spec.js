import { expect } from '@playwright/test';
import { test } from '../src/helpers/fixtures/fixture';
import * as allure from 'allure-js-commons';


test('Фикстура 1', async ({ registredUser, app }) => {
    await allure.tms('TMS-456', 'Related TMS issue');
    const {user} = registredUser;
    const {email, password, name} = user;

    await app.main.open(url);
    await app.main.gotoRegister();
    await app.register.register(name, email, password);

   await expect(app.home.profileName).toContainText(user.name);

});


test('Фикстура 2', async ({ userProfilePage }) => {
    await allure.tms('TMS-456', 'Related TMS issue');
   
    const{app} = userProfilePage;
    const{user} = userProfilePage;

   await expect(app.home.profileName).toContainText(user.name);

});


test.only('Фикстура 3', async ({ createWithRole }) => {
    await allure.tms('TMS-456', 'Related TMS issue');
   
    const user = createWithRole('admin')

    await expect(user).toHaveProperty(user.name)
});