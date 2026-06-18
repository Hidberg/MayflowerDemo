import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';
import { qaInterviewUser, serverTimeZone } from '../config/env';
import type { StatisticsPage } from '../pages/analytics/StatisticsPage';

const CLICK_REGISTRATION_URL = 'go.stripchat.com/r';

test.describe('Statistics/Report/Click registration', () => {

    const verifySummaryTableHeaders = async (statisticsPage: StatisticsPage) => {
        const groupColumnHeader = await statisticsPage.summaryTable.columnHeader(0);
        expect(groupColumnHeader).toEqual('GROUP');
        const clicksColumnHeader = await statisticsPage.summaryTable.columnHeader(1);
        expect(clicksColumnHeader).toEqual('CLICKS');
    };

    const getTopRow = async (statisticsPage: StatisticsPage) => {
        const lastDate = await statisticsPage.summaryTable.cellValue(0, 0);
        const clicksCount = parseInt(await statisticsPage.summaryTable.cellValue(0, 1));
        return { lastDate, clicksCount };
    };

    test('Report registers a new click after visiting the default referral link', async ({
        loginPage, defaultReferralLinkWidget, sidebarNav, statisticsPage, guestContext,
    }) => {
        const today = new Date().toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            timeZone: serverTimeZone,
        });

        await test.step('Log in', async () => {
            await loginPage.goto();
            await loginPage.login(qaInterviewUser.login, qaInterviewUser.password);
        });

        const defaultLink = await test.step('Read the default referral link', async () => {
            await expect(defaultReferralLinkWidget.defaultLink).toBeVisible();
            return defaultReferralLinkWidget.getDefaultLink();
        });

        const clicksCountBefore = await test.step('Open statistics and run the default report', async () => {
            await sidebarNav.goToStatistics();
            await statisticsPage.runReport();
            await verifySummaryTableHeaders(statisticsPage);

            const { lastDate, clicksCount } = await getTopRow(statisticsPage);
            if (lastDate === today) {
                expect(clicksCount).toBeGreaterThan(0);
                return clicksCount;
            }
            return 0;
        });

        await test.step('Generate a click by opening the default referral link', async () => {
            const guestPage = await guestContext.newPage();
            const clickRegistration = guestPage.waitForResponse(r => r.url().includes(CLICK_REGISTRATION_URL) && r.url().includes('action=set'));
            await guestPage.goto(defaultLink);
            await clickRegistration;
        });

        await test.step('Verify the report registered new click', async () => {
            await expect(async () => {
                await statisticsPage.runReport();
                await verifySummaryTableHeaders(statisticsPage);

                const { lastDate, clicksCount: clicksCountAfter } = await getTopRow(statisticsPage);
                expect(lastDate).toEqual(today);
                const delta = clicksCountAfter - clicksCountBefore;
                if (delta > 1) {
                    test.info().annotations.push({ type: 'warning', description: `Concurrent clicks detected on shared account: delta=${delta}` });
                }
                expect(clicksCountAfter, 'Click was not registered').toBeGreaterThan(clicksCountBefore);
            }).toPass({
                intervals: [3_000],
                timeout: 45_000,
            });
        });
    });

});
