import tf from './testFunctions';


const timeout = process.env.SLOWMO ? 40000 : 20000;
const {toMatchImageSnapshot} = require('jest-image-snapshot');
expect.extend({toMatchImageSnapshot});

beforeAll(async () => {
    await page.goto(tf.testURL, {waitUntil: 'domcontentloaded'});
    tf.sleep(200);
    await tf.assertPageTitle('')
});

//checks that navigation of nav bar items works and sends you to the correct page
async function assertNavigateTo(buttonXpath, location) {
    const button = await tf.getElementByXpath(buttonXpath);
    //console.log(button);
    await tf.clickOnElementByHandle(button[0]);
    tf.sleep(200);
    await tf.assertElemExistenceByXpath("//div[contains(.,'"+location+"')]", true);
}

describe('Navigation Bar Tests - Nav Buttons', () => {

    //define xpath for each nav button
    let hamburgerBtn      = "//nav/div/div[1]/button";
    let userProfileBtn    = "//nav/ul[2]/li[2]/ul/li/div[1]";
    let administrationBtn = "//nav/ul[2]/li[4]/ul/li/div[1]";

    test('existence of root navigation buttons', async () => {
        await tf.assertElemExistenceByXpath(hamburgerBtn, true);
        await tf.assertElemExistenceByXpath(userProfileBtn, true);
        await page.$x(userProfileBtn).then(element => expect(element[0].screenshot({"encoding":"base64"})).resolves.toMatchImageSnapshot());
        await tf.assertElemExistenceByXpath(administrationBtn, true);
        await page.$x(administrationBtn).then(element => expect(element[0].screenshot({"encoding":"base64"})).resolves.toMatchImageSnapshot());
    }, timeout);

});
