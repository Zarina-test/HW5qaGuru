
export class RegisterPage {

    constructor(page) {

        this.page = page;

        this.signupButton = page.getByRole('button', { name: 'Sign up' });

        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.nameInput = page.getByRole('textbox', { name: 'Your Name' });
        this.password = page.getByRole('textbox', { name: 'Password' });

    }

    async register(name, email, password) {
        
        await this.nameInput.click();
        await this.nameInput.fill(name);
        await this.emailInput.click();
        await this.emailInput.fill(email);
        await this.password.click();
        await this.password.fill(password);
        await this.signupButton.click();

    };


};
