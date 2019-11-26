import tf from './testFunctions';


const {toMatchImageSnapshot} = require('jest-image-snapshot');
expect.extend({toMatchImageSnapshot});

beforeEach(async () => {
    await page.goto(tf.testURL, {waitUntil: 'domcontentloaded'});
});

describe('Navigation Bar Tests - expand/collapse', () => {

    test('expand nav bar', async () => {

        await tf.assertElemExistence('nav', true);
        await tf.clickOnElem('button');
        await tf.assertVisibilityOfElementByXpath('//div[contains(text(), \'Test environment - en\')]', true);

        await page.$x("//nav").then(element => expect(element[0].screenshot({"encoding":"base64"})).resolves.toMatchImageSnapshot());
    }, tf.timeout);

    test('collapse nav bar', async () => {

        await tf.clickOnElem('button');
        await tf.assertVisibilityOfElementByXpath('//div[contains(text(), \'Test environment - en\')]', true);
        await tf.clickOnElem('button');
        await tf.assertVisibilityOfElementByXpath('//div[contains(text(), \'Test environment - en\')]', false);

        await page.$x("//nav").then(element => expect(element[0].screenshot({"encoding":"base64"})).resolves.toMatchImageSnapshot());
    }, tf.timeout);
});
