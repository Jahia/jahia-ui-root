import tf from './testFunctions';


beforeEach(async () => {
    await page.goto(tf.testURL, {waitUntil: 'networkidle0'});
});

describe('Navigation - test signout', () => {

    test('Sign out exists', async () => {
        await page.waitForSelector('nav');

        await tf.assertElemExistence('nav', true);
        await tf.clickOnElem('button');
        await tf.assertVisibilityOfElementByXpath('//div[contains(text(), \'Test environment - en\')]', true);

        await page.$x("//ul/li/div[3]/button").then(element => expect(element[0].screenshot({"encoding":"base64"})).resolves.toMatchImageSnapshot());
    }, tf.timeout);

    test('logout from jahia', async () => {
        await page.waitForSelector('nav');

        await tf.assertElemExistence('nav', true);
        await tf.clickOnElem('button');

        const button = await page.waitForXPath('//button[text()="Sign out"]');
        await button.click();
        await page.waitForNavigation({waitUntil: 'load'});

        await tf.assertElemExistence(".login-form", true)

    }, tf.timeout);
});
