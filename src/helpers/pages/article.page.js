export class ArticlePage {

    constructor(page) {
        
        this.page = page;
        this.articleTitle = page.locator('h1');
        this.articleBody = page.locator('.article-content p');
        this.articleTags = page.locator('.tag-list .tag-pill');
        this.commentInput = page.getByPlaceholder('Write a comment...');
        this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
        this.comments = page.locator('.card .card-block p');
        this.favoriteButton = page.getByRole('button', { name: 'Favorite Article' });
        this.followButton = page.getByRole('button', { name: 'Follow' });
    }

    async getArticleTitle() {
        return await this.articleTitle.textContent();
    }

    async addComment(comment) {
        await this.commentInput.fill(comment);
        await this.postCommentButton.click();
    }

    async getComments() {
        return await this.comments.allTextContents();
    }

    async deleteComment(index = 0) {
        const deleteButtons = this.page.locator('.card .btn-outline-secondary');
        await deleteButtons.nth(index).click();
    }
};