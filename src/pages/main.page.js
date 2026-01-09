
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
        await this.signupLink.click();
    }

    async gotoNewArticle() {
        await this.newArticleLink.click();
    }

    async gotoHome() {
        await this.homeLink.click();
    }

    async open(url) {
        await this.page.goto(url);
    }
}