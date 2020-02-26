const constants = require('../constants');
const timeout = 10000;
const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ toMatchImageSnapshot });

// const sleep = (ms) => {
//     return new Promise(resolve => setTimeout(resolve, ms))
// }

describe('primary nav bar tests', () => {
    let page;
    beforeAll(async () => {
        page = await global.__BROWSER__.newPage();
        await page.goto(process.env[constants.TEST_URL], {waitUntil: 'networkidle0'});
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

        //wait until nav bar is fully expanded
        await page.waitForFunction('document.getElementsByClassName(\'flexCol_nowrap\')[0].offsetWidth > 290');

        //remove all children nodes from nav
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
}, timeout);
