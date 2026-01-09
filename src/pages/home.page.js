
export class HomePage {
    constructor(page) {
        this.page = page;
        this.globalFeedTab = page.locator('.nav-link', { hasText: 'Global Feed' });
        this.articlePreviews = page.locator('.article-preview');
        this.tags = page.locator('.tag-list .tag-pill');
        this.articleTitles = page.locator('h1');
        this.articleAuthors = page.locator('.article-preview .author');
        this.favoriteButtons = page.locator('.article-preview .btn-outline-primary');
    }

    async openGlobalFeed() {
        await this.globalFeedTab.click();
    }

    async getArticleTitles() {
        return await this.articleTitles.allTextContents();
    }

    async clickOnFirstArticle() {
        await this.articleTitles.nth(0).click();
    }

    async clickOnTag(tagName) {
        await this.page.locator('.tag-list .tag-pill', { hasText: tagName }).click();
    }

    async getTags() {
        return await this.tags.allTextContents();
    }
};
