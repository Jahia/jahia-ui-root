import tf from './testFunctions';


//this can be used to detect the language from any string
//const franc = require('franc');  // see doc here: https://github.com/wooorm/franc

beforeEach(async () => {
    await page.goto(tf.testURL, {waitUntil: 'networkidle0'});
    //await tf.assertPageTitle(tf.getBaseUrl() + "modules/moonstone");
});


describe('Navigation - i18n tests', () => {

    test('switch to french', async () => {
        await page.waitForSelector('nav');

        await tf.setPageLang('fr');
        await page.reload({waitUntil: 'domcontentloaded'});
        await tf.clickOnElem('button');
        await tf.assertVisibilityOfElementByXpath('//div[contains(text(), \'Test environment - fr\')]', true);
        await page.$x("//nav").then(element => expect(element[0].screenshot({"encoding":"base64"})).resolves.toMatchImageSnapshot());
     }, tf.timeout);
});
