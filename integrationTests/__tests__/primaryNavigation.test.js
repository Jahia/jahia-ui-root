const constants = require('../constants');
const timeout = 10000;
const {toMatchImageSnapshot} = require('jest-image-snapshot');
expect.extend({toMatchImageSnapshot});

// Const sleep = (ms) => {
//     return new Promise(resolve => setTimeout(resolve, ms))
// }

describe('primary nav bar tests', () => {
    let page;
    beforeAll(async () => {
        page = await global.__BROWSER__.newPage();
        await page.goto(process.env[constants.TEST_URL] + '/start', {waitUntil: 'networkidle0'});
        await page.type('input[name=\'username\']', process.env[constants.JAHIA_USERNAME], {delay: 50});
        await page.type('input[name=\'password\']', process.env[constants.JAHIA_PASSWORD], {delay: 50});
        await Promise.all([
            page.waitForNavigation(),
            page.click('button[type=\'submit\']')
        ]);
    });

    it('expands the nav bar', async () => {
        await page.goto(process.env[constants.TEST_URL] + '/jahia', {waitUntil: 'networkidle2'});
        await page.click('nav button');

        // Wait until nav bar is fully expanded
        await page.waitForFunction('document.querySelector(\'nav\').offsetWidth == 300');

        // Remove all children nodes from nav
        await page.evaluate(() => {
            let e = document.querySelector('nav');
            let child = e.lastElementChild;
            while (child) {
                e.removeChild(child);
                child = e.lastElementChild;
            }
        });

        const navEl = await page.$('nav');

        expect(await navEl.screenshot()).toMatchImageSnapshot();
    });

    it('collapses the nav bar', async () => {
        await page.goto(process.env[constants.TEST_URL] + '/jahia', {waitUntil: 'networkidle2'});

        await page.click('nav button');
        // Wait until nav bar is fully expanded
        await page.waitForFunction('document.querySelector(\'nav\').offsetWidth == 300');

        await page.click('nav button');
        // Wait until nav bar is fully collapsed
        await page.waitForFunction('document.querySelector(\'nav\').offsetWidth == 56');

        // Remove all children nodes from nav
        await page.evaluate(() => {
            let e = document.querySelector('nav');
            let child = e.lastElementChild;
            while (child) {
                e.removeChild(child);
                child = e.lastElementChild;
            }
        });

        const navEl = await page.$('nav');

        expect(await navEl.screenshot()).toMatchImageSnapshot();
    })

    it('checks header renders correctly', async() => {
        await page.goto(process.env[constants.TEST_URL] + '/jahia', {waitUntil: 'networkidle2'});

        await page.click('nav button');
        // Wait until nav bar is fully expanded
        await page.waitForFunction('document.querySelector(\'nav\').offsetWidth == 300');

        const navEl = await page.$('nav div');

        expect(await navEl.screenshot()).toMatchImageSnapshot();
    })

    it('checks that the top-half renders correctly', async() => {
        await page.goto(process.env[constants.TEST_URL] + '/jahia', {waitUntil: 'networkidle2'});

        await page.click('nav button');
        // Wait until nav bar is fully expanded
        await page.waitForFunction('document.querySelector(\'nav\').offsetWidth == 300');

        const navEl = await page.$$('nav ul');

        expect(await navEl[0].screenshot()).toMatchImageSnapshot();
    })

    it('checks that the bottom-half renders correctly', async() => {
        await page.goto(process.env[constants.TEST_URL] + '/jahia', {waitUntil: 'networkidle2'});

        await page.click('nav button');
        // Wait until nav bar is fully expanded
        await page.waitForFunction('document.querySelector(\'nav\').offsetWidth == 300');

        const navEl = await page.$$('nav ul');

        expect(await navEl[3].screenshot()).toMatchImageSnapshot();
    })
}, timeout);
