import { Page, Locator } from '@playwright/test';

export class SidebarNav {
    readonly page: Page;
    readonly sideBar: Locator;
    readonly analytics: Locator;
    readonly statistics: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sideBar = page.getByRole('navigation', { name: 'sidebarPopover' });
        this.analytics = page.getByTitle('Analytics');
        this.statistics = page.locator('[href="/analytics/statistics"]');
    }

    async expandAnalytics(): Promise<void> {
        await this.analytics.click();
    }

    async openStatistics(): Promise<void> {
        await this.statistics.click();
    }

    async goToStatistics(): Promise<void> {
        await this.expandAnalytics();
        await this.openStatistics();
    }

}