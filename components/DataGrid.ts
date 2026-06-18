import { Locator } from '@playwright/test';

export class DataGrid {
    constructor(private readonly root: Locator) { }

    async columnHeader(columnIndex: number): Promise<string> {
        return await this.root
            .locator(`[data-testid="TableHead"][data-column-index="${columnIndex}"]`).innerText();
    }

    async cellValue(rowIndex: number, columnIndex: number): Promise<string> {
        return await this.root
            .locator(`[data-testid="TableCell"][data-row-index="${rowIndex}"][data-column-index="${columnIndex}"]`).innerText();
    }
}
