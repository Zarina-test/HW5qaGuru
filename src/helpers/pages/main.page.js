import { test, expect } from '@playwright/test';

export class MainPage {
    constructor(page) {
        this.page = page;
        this.signupLink = page.getByRole('link', { name: 'Sign up' });
        this.signinLink = page.getByRole('link', { name: 'Sign in' });
        this.newArticleLink = page.getByRole('link', { name: 'New Article' });
        this.homeLink = page.getByRole('link', { name: 'Home' });
        this.profileLink = page.getByRole('link', { name: 'Settings' });
    }

    async gotoRegister() {
        
        return test.step('go to registry page', async(step) => {
        
            await this.signupLink.click();
    })
    }

    async gotoNewArticle() {
        await this.newArticleLink.click();
    }

    async gotoHome() {
        await this.homeLink.click();
    }

    async open(url) {
        return test.step('go to MAIN page', async(step) => {
            await this.page.goto(url);
    })
}
}