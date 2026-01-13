import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/helpers/pages/main.page';
import { RegisterPage } from '../src/helpers/pages/register.page';
import { HomePage } from '../src/helpers/pages/home.page';
import { ArticlePage } from '../src/helpers/pages/article.page';
import { NewArticlePage } from '../src/helpers/pages/new-article.page';

const user = {

  email: faker.internet.email({provider: 'mail.ru'}),
  name: faker.person.firstName({length: 5}),
  password: faker.internet.password({length: 10})
}

const url = 'https://realworld.qa.guru/';

async function registerUser(page) {

    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);
    const homePage = new HomePage(page);

    await mainPage.open(url);
    await mainPage.gotoRegister();
    await registerPage.register(user.name, user.email, user.password);
    await expect(page.getByRole('navigation')).toContainText(user.name);
}

async function createArticle(page, title, description, body, tags = []) {
    const mainPage = new MainPage(page);
    const newArticlePage = new NewArticlePage(page);

    await mainPage.gotoNewArticle();
    await newArticlePage.createArticle(title, description, body, tags);
}

test('Пользователь может удалить комментарий к статье', async ({ page }) => {

    const mainPage = new MainPage(page);
    const homePage = new HomePage(page);
    const articlePage = new ArticlePage(page);

    await registerUser(page);
    const articleTitle = faker.lorem.sentence();
    const articleDescription = faker.lorem.sentence();
    const articleBody = faker.lorem.paragraphs(2);
    await createArticle(page, articleTitle, articleDescription, articleBody);

    await mainPage.gotoHome();
    await homePage.openGlobalFeed();
    await homePage.clickOnFirstArticle();

    const comment = faker.lorem.sentence();
    await articlePage.addComment(comment);
    await page.waitForTimeout(2000);

    let comments = await articlePage.getComments();
    expect(comments).toContain(comment);

    page.on('dialog', dialog => dialog.accept());
    await articlePage.deleteComment();
    await page.waitForTimeout(2000);

    comments = await articlePage.getComments();
    expect(comments).not.toContain(comment);

});

test('Пользователь может фильтровать статьи по тегу', async ({ page }) => {

    const mainPage = new MainPage(page);
    const homePage = new HomePage(page);

    await registerUser(page);
    const articleTitle = faker.lorem.sentence();
    const articleDescription = faker.lorem.sentence();
    const articleBody = faker.lorem.paragraphs(2);
    const tag = faker.lorem.word();
    await createArticle(page, articleTitle, articleDescription, articleBody, [tag]);

    await mainPage.gotoHome();
    await homePage.openGlobalFeed();
    await homePage.clickOnTag(tag);
    const articles = await homePage.getArticleTitles();
    expect(articles.length).toBeGreaterThan(0);
    expect(articles).toContain(articleTitle);

});

test('Пользователь может читать статью и просматривать комментарии', async ({ page }) => {

    const mainPage = new MainPage(page);
    const homePage = new HomePage(page);
    const articlePage = new ArticlePage(page);

    await registerUser(page);
    const articleTitle = faker.lorem.sentence();
    const articleDescription = faker.lorem.sentence();
    const articleBody = faker.lorem.paragraphs(2);
    await createArticle(page, articleTitle, articleDescription, articleBody);

    await mainPage.gotoHome();
    await homePage.openGlobalFeed();
    await homePage.clickOnFirstArticle();

    const title = await articlePage.getArticleTitle();
    expect(title).toBeTruthy();

    const comments = await articlePage.getComments();
    expect(Array.isArray(comments)).toBe(true);

});

test('Пользователь может создать новую статью', async ({ page }) => {

    const mainPage = new MainPage(page);
    const articlePage = new ArticlePage(page);
    const newArticlePage = new NewArticlePage(page);

    await registerUser(page);
    await mainPage.gotoNewArticle();

    const articleTitle = faker.lorem.sentence();
    const articleDescription = faker.lorem.sentence();
    const articleBody = faker.lorem.paragraphs(2);

    await newArticlePage.createArticle(articleTitle, articleDescription, articleBody);

    const title = await articlePage.getArticleTitle();
    expect(title).toBe(articleTitle);

});

test('Пользователь может добавить комментарий к статье', async ({ page }) => {

    const mainPage = new MainPage(page);
    const homePage = new HomePage(page);
    const articlePage = new ArticlePage(page);

    await registerUser(page);
    await mainPage.gotoHome();
    await homePage.openGlobalFeed();
    await homePage.clickOnFirstArticle();

    const comment = faker.lorem.sentence();
    await articlePage.addComment(comment);
    await page.waitForTimeout(2000);

    const comments = await articlePage.getComments();
    expect(comments).toContain(comment);

});
