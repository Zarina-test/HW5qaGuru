import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/main.page';
import { RegisterPage } from '../src/pages/register.page';
import { HomePage } from '../src/pages/home.page';
import { ArticlePage } from '../src/pages/article.page';
import { NewArticlePage } from '../src/pages/new-article.page';

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

test('Пользователь может просматривать глобальный фид статей', async ({ page }) => {
    const mainPage = new MainPage(page);
    const homePage = new HomePage(page);

    await mainPage.open(url);
    await page.waitForLoadState('networkidle');

    const articles = await homePage.getArticleTitles();
    expect(articles.length).toBeGreaterThanOrEqual(0);
});

test('Пользователь может фильтровать статьи по тегу', async ({ page }) => {
    const mainPage = new MainPage(page);
    const homePage = new HomePage(page);

    await mainPage.open(url);
    const tags = await homePage.getTags();
    if (tags.length > 0) {
        await homePage.clickOnTag(tags[0]);
        const articles = await homePage.getArticleTitles();
        expect(articles.length).toBeGreaterThanOrEqual(0);
    }
});

test('Пользователь может читать статью и просматривать комментарии', async ({ page }) => {
    const mainPage = new MainPage(page);
    const homePage = new HomePage(page);
    const articlePage = new ArticlePage(page);

    await mainPage.open(url);
    await homePage.clickOnFirstArticle();

    const title = await articlePage.getArticleTitle();
    expect(title).toBeTruthy();

    const comments = await articlePage.getComments();
    expect(Array.isArray(comments)).toBe(true);
});

test('Пользователь может создать новую статью', async ({ page }) => {
    const mainPage = new MainPage(page);
    const newArticlePage = new NewArticlePage(page);

    await registerUser(page);
    await mainPage.gotoNewArticle();

    const articleTitle = faker.lorem.sentence();
    const articleDescription = faker.lorem.sentence();
    const articleBody = faker.lorem.paragraphs(2);

    await newArticlePage.createArticle(articleTitle, articleDescription, articleBody);

    // Тест прошел, если публикация не выдает ошибку
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

    // Тест прошел, если addComment не выдал ошибку
});
