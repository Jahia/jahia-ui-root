import tf from './testFunctions';

const {toMatchImageSnapshot} = require('jest-image-snapshot');
expect.extend({toMatchImageSnapshot});

beforeEach(async () => {
    await page.goto(tf.testURL, {waitUntil: 'domcontentloaded'});
    tf.sleep(200);
    //await tf.assertPageTitle('')
});

describe('Navigation Bar Tests - Nav Buttons', () => {

    //define xpath for each nav button
    let hamburgerBtn      = "//nav/div/div[1]/button";
    let userProfileBtn    = "//nav/ul[2]/li[2]/ul/li/div[1]";
    let administrationBtn = "//nav/ul[2]/li[4]/ul/li/div[1]";

    test('existence of root navigation buttons', async () => {
        //await page.$x("//nav").then(element => expect(element[0].screenshot({"encoding":"base64"})).resolves.toMatchImageSnapshot());
        await tf.assertElemExistenceByXpath(hamburgerBtn, true);
        await tf.assertElemExistenceByXpath(userProfileBtn, true);
        await page.$x(userProfileBtn).then(element => expect(element[0].screenshot({"encoding":"base64"})).resolves.toMatchImageSnapshot());
        await tf.assertElemExistenceByXpath(administrationBtn, true);
        await page.$x(administrationBtn).then(element => expect(element[0].screenshot({"encoding":"base64"})).resolves.toMatchImageSnapshot());
    }, tf.timeout);

});
