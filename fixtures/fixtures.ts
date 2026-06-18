import { test as base, BrowserContext } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SidebarNav } from '../components/SidebarNav';
import { DefaultReferralLinkWidget } from '../components/DefaultReferralLinkWidget';
import { StatisticsPage } from '../pages/analytics/StatisticsPage';

export const test = base.extend<{
    guestContext: BrowserContext;
    loginPage: LoginPage;
    defaultReferralLinkWidget: DefaultReferralLinkWidget;
    sidebarNav: SidebarNav;
    statisticsPage: StatisticsPage;
}>({
    guestContext: async ({ browser }, use) => {
        const context = await browser.newContext();
        await use(context);
        await context.close();
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    defaultReferralLinkWidget: async ({ page }, use) => {
        const defaultReferralLinkWidget = new DefaultReferralLinkWidget(page);
        await use(defaultReferralLinkWidget);
    },
    sidebarNav: async ({ page }, use) => {
        const sidebarNav = new SidebarNav(page);
        await use(sidebarNav);
    },
    statisticsPage: async ({ page }, use) => {
        const statisticsPage = new StatisticsPage(page);
        await use(statisticsPage);
    },
});
