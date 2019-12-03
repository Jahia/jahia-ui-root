import tf from './testFunctions';


beforeEach(async () => {
    await page.goto(tf.testURL, {waitUntil: 'networkidle0'});
});

describe('Navigation Bar Tests - expand/collapse', () => {

    test('expand nav bar', async () => {
        await page.waitForSelector('nav');

        await tf.assertElemExistence('nav', true);
        await tf.clickOnElem('button');
        await tf.assertVisibilityOfElementByXpath('//div[contains(text(), \'Test environment - en\')]', true);

        await page.$x("//nav/div").then(element => expect(element[0].screenshot({"encoding":"base64"})).resolves.toMatchImageSnapshot());
    }, tf.timeout);

    test('collapse nav bar', async () => {
        await page.waitForSelector('nav');

        await tf.clickOnElem('button');
        await tf.assertVisibilityOfElementByXpath('//div[contains(text(), \'Test environment - en\')]', true);
        await tf.clickOnElem('button');
        await tf.assertVisibilityOfElementByXpath('//div[contains(text(), \'Test environment - en\')]', false);

        await page.$x("//nav/div").then(element => expect(element[0].screenshot({"encoding":"base64"})).resolves.toMatchImageSnapshot());
    }, tf.timeout);
});
