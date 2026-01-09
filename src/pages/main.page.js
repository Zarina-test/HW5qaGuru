
export class MainPage {
    constructor(page) {
        this.page = page;
        this.signupLink = page.getByRole('link', { name: 'Sign up' }).describe('signup buttom');
    }

    async gotoRegister() {
        await this.signupLink.click();
    }

    async open(url) {
        await this.page.goto(url);
    }
}