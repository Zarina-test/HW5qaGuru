export class NewArticlePage {
    
    constructor(page) {
        this.page = page;
        this.titleInput = page.getByPlaceholder('Article Title');
        this.descriptionInput = page.getByPlaceholder("What's this article about?");
        this.bodyInput = page.getByPlaceholder('Write your article (in markdown)');
        this.tagsInput = page.getByPlaceholder('Enter tags');
        this.publishButton = page.getByRole('button', { name: 'Publish Article' });
    }

    async createArticle(title, description, body, tags = []) {
        await this.titleInput.fill(title);
        await this.descriptionInput.fill(description);
        await this.bodyInput.fill(body);
        if (tags.length > 0) {
            await this.tagsInput.fill(tags.join(' '));
        }
        await this.publishButton.click();
    }
};