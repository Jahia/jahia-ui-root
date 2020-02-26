const constants = require('../constants');
const timeout = 10000;

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

        // const currentUrl = await page.url();
        // expect(currentUrl).toBe(process.env[constants.TEST_URL] + '/jahia/dashboard/projects');
    });

    it('expands the nav bar', async () => {
        await page.goto(process.env[constants.TEST_URL] + '/jahia', {waitUntil: 'networkidle0'})
        await Promise.all([
            page.waitForNavigation(),
            page.click('nav button')
        ]);

        const [elementHandle] = await page.$x('.//nav');
        const propertyHandle = await elementHandle.getProperty('width');
        const propertyValue = await propertyHandle.jsonValue();

        console.log(propertyValue);
        return true;
    })
}, timeout);
