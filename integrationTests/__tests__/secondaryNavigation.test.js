const constants = require('../constants');
const timeout = 10000;
const {toMatchImageSnapshot} = require('jest-image-snapshot');
expect.extend({toMatchImageSnapshot});

describe('primary nav bar tests', () => {
    let page;
    beforeAll(async () => {
        page = await global.__BROWSER__.newPage();
        await page.goto(process.env[constants.TEST_URL] + '/start', {waitUntil: 'networkidle0'});
        // Login
        await page.type('input[name=\'username\']', process.env[constants.JAHIA_USERNAME], {delay: 50});
        await page.type('input[name=\'password\']', process.env[constants.JAHIA_PASSWORD], {delay: 50});
        await Promise.all([
            page.waitForNavigation(),
            page.click('button[type=\'submit\']')
        ]);
    });

    it('checks that secondary nav menu for Administration renders correctly', async () => {
        /* Test steps
        * 1. go to /jahia/administration
        * 2. check that secondary nav is rendered correctly
        * */
        await page.goto(process.env[constants.TEST_URL] + '/jahia/administration', {waitUntil: 'networkidle2'});

        await page.waitForFunction('document.querySelector(\'div[role=resizable-panel]\').offsetWidth == 245');

        // Remove all children nodes from nav
        await page.evaluate(() => {
            let e = document.querySelector('div[role=resizable-panel]');
            let child = e.lastElementChild;
            while (child) {
                e.removeChild(child);
                child = e.lastElementChild;
            }
        });

        const secondaryNav = await page.$('div[role=resizable-panel]');
        expect(await secondaryNav.screenshot()).toMatchImageSnapshot();
    });

    it('checks that secondary nav collapses correctly', async () => {
        /* Test steps
        * 1. go to /jahia/administration
        * 2. click on the collapse/expand button for secondary nav
        * 3. check that secondary nav collapsed
        * */
        await page.goto(process.env[constants.TEST_URL] + '/jahia/administration', {waitUntil: 'networkidle2'});

        await page.click('div[role=resizable-panel] button');
        await page.waitForFunction('document.querySelector(\'div[role=resizable-panel]\').offsetWidth == 0');

        await page.evaluate(() => {
            let e = document.querySelector('main');
            let child = e.lastElementChild;
            while (child) {
                e.removeChild(child);
                child = e.lastElementChild;
            }
        });

        const pageView = await page.$('#reactComponent');
        expect(await pageView.screenshot()).toMatchImageSnapshot();
    });

    it('checks that secondary nav expands correctly', async () => {
        /* Test steps
        * 1. go to /jahia/administration
        * 2. click on the collapse/expand button for secondary nav
        * 3. click on the button again
        * 4. check that secondary nav expanded
        * */
        await page.goto(process.env[constants.TEST_URL] + '/jahia/administration', {waitUntil: 'networkidle2'});

        await page.click('div[role=resizable-panel] button');
        await page.waitForFunction('document.querySelector(\'div[role=resizable-panel]\').offsetWidth < 10');

        await page.click('div[role=resizable-panel] button');
        await page.waitForFunction('document.querySelector(\'div[role=resizable-panel]\').offsetWidth == 245');

        await page.evaluate(() => {
            let e = document.querySelector('main');
            let child = e.lastElementChild;
            while (child) {
                e.removeChild(child);
                child = e.lastElementChild;
            }
        });

        const pageView = await page.$('#reactComponent');
        expect(await pageView.screenshot()).toMatchImageSnapshot();
    });

    it('checks resizability of secondary nav', async () => {
        /* Test steps
        * 1. go to /jahia/administration
        * 2. resize the secondary nav
        * 3. check that nav was resized
        * */
        await page.goto(process.env[constants.TEST_URL] + '/jahia/administration', {waitUntil: 'networkidle2'});

        await page.waitForFunction('document.querySelector(\'div[role=resizable-panel]\').offsetWidth == 245');

        const resizeButton = await page.$('._2GnMptgmO_eikJROaiwGCv');
        const ob = await resizeButton.boundingBox();

        const obWidthCenter = ob.width / 2;
        const obHeightCenter = ob.height / 2;
        await page.mouse.move(ob.x + obWidthCenter, ob.y + obHeightCenter);
        await page.mouse.down();

        const newXPosition = (ob.x + obWidthCenter) + 200;

        await page.mouse.move(newXPosition, ob.y + obHeightCenter);
        await page.mouse.up();

        await page.evaluate(() => {
            let e = document.querySelector('main');
            let child = e.lastElementChild;
            while (child) {
                e.removeChild(child);
                child = e.lastElementChild;
            }
        });

        const pageView = await page.$('#reactComponent');
        expect(await pageView.screenshot()).toMatchImageSnapshot();
    });

    afterAll(async () => {
        // Logout
        await page.goto(process.env[constants.TEST_URL] + '/jahia', {waitUntil: 'networkidle2'});
        await page.click('nav button');
        // Wait until nav bar is fully expanded
        await page.waitForFunction('document.querySelector(\'nav\').offsetWidth == 300');
        await Promise.all([
            page.waitForNavigation(),
            page.click('nav ul button')
        ]);
        // Check that we are redirected to /start page after logout
        expect(await page.url()).toBe(process.env[constants.TEST_URL] + '/start');
        await page.close();
    });
}, timeout);

