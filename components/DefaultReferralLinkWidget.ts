import { Page, Locator } from '@playwright/test';

export class DefaultReferralLinkWidget {
    readonly page: Page;
    readonly defaultLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.defaultLink = page.getByTestId('LinkUrl');
    }

    async getDefaultLink(): Promise<string> {
        return await this.defaultLink.textContent() || '';
    }

}