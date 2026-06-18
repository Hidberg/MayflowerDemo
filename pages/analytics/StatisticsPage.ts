import { Page, Locator } from '@playwright/test';
import { DataGrid } from '../../components/DataGrid';

export class StatisticsPage {
    readonly page: Page;
    readonly runReportButton: Locator;
    readonly summaryTable: DataGrid;

    constructor(page: Page) {
        this.page = page;
        this.runReportButton = page.getByRole('button', { name: 'Run report' });
        this.summaryTable = new DataGrid(page.locator('[qa-element="summary-table"]'));
    }

    async runReport(): Promise<void> {
        await this.runReportButton.click();
    }
}
