import tf from './testFunctions';

const timeout = process.env.SLOWMO ? 30000 : 10000;
const {toMatchImageSnapshot} = require('jest-image-snapshot');
expect.extend({toMatchImageSnapshot});

beforeAll(async () => {
    await page.goto(url, {waitUntil: 'domcontentloaded'});
});

describe('Navigation Bar Tests - expand/collapse', () => {

    let initialScreenshot;
    let expandedScreenshot;

    test('expand nav bar', async () => {
        initialScreenshot = await tf.takeScreenshot('initial-view', 900, 1200);
        await tf.assertElemExistence('nav.flexCol_nowrap', true);
        await tf.clickOnElem('button');
        await tf.assertVisibilityOfElementByXpath('//div[contains(text(), \'Test environment en\')]', true);
        expandedScreenshot = await tf.takeScreenshot('expanded-view', 900, 1200);
    }, timeout);

    test('collapse nav bar', async () => {
        expect(expandedScreenshot).toMatchImageSnapshot();
        await tf.clickOnElem('button');
        await tf.assertVisibilityOfElementByXpath('//div[contains(text(), \'Test environment en\')]', false);
        expect(initialScreenshot).toMatchImageSnapshot();
    }, timeout);
});
