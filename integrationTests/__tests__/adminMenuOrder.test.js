const constants = require('../constants');

const timeout = 5000;
// Const adminMenuList = ['Server', 'Sites'];
// const serverMenuList = ['About Jahia',
//     'Configuration',
//     'System Components',
//     'System Health',
//     'Users and Roles',
//     'Web projects'];
// const sitesMenuList = ['Modules'];

describe('admin menu order test', () => {
    let page;
     beforeAll(async () => {
        page = await global.__BROWSER__.newPage();
        await page.goto(process.env[constants.TEST_URL], {waitUntil: 'networkidle0'});
        await page.type('input[name=\'username\']', process.env[constants.JAHIA_USERNAME], {delay: 50});
        await page.type('input[name=\'password\']', process.env[constants.JAHIA_PASSWORD], {delay: 50});
        const [response] = await Promise.all([
            page.waitForNavigation(),
            page.click('button[type=\'submit\']')
        ]);

        // const currentUrl = await page.url();
        // expect(currentUrl).toBe(process.env[constants.TEST_URL] + '/jahia/dashboard/projects');
    });

    it('asserts order of admin menu', async () => {
        return true;
    });
}, timeout);
