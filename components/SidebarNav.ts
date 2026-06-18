import { Page, Locator } from '@playwright/test';

export class SidebarNav {
    readonly page: Page;
    readonly sidebar: Locator;
    readonly analytics: Locator;
    readonly statistics: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sidebar = page.locator('nav#sidebarPopover');
        this.analytics = this.sidebar.getByTitle('Analytics');
        this.statistics = this.sidebar.locator('[href="/analytics/statistics"]');
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