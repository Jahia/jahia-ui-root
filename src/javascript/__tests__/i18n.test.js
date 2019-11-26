import tf from './testFunctions';

const timeout = process.env.SLOWMO ? 40000 : 20000;
const {toMatchImageSnapshot} = require('jest-image-snapshot');
expect.extend({toMatchImageSnapshot});

//this can be used to detect the language from any string
//const franc = require('franc');  // see doc here: https://github.com/wooorm/franc

beforeAll(async () => {
    await page.goto(tf.testURL, {waitUntil: 'domcontentloaded'});
    tf.sleep(200);
    //await tf.assertPageTitle(tf.getBaseUrl() + "modules/moonstone");
});


describe('Navigation - i18n tests', () => {

    test('switch to french', async () => {
        await tf.setPageLang('fr');
        await page.reload({waitUntil: 'domcontentloaded'});
        await tf.clickOnElem('button');
        await tf.assertVisibilityOfElementByXpath('//div[contains(text(), \'Test environment - fr\')]', true);
        await page.$x("//nav").then(element => expect(element[0].screenshot({"encoding":"base64"})).resolves.toMatchImageSnapshot());
    }, timeout);
});
