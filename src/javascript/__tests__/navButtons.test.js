import tf from './testFunctions';

const timeout = process.env.SLOWMO ? 40000 : 20000;
const {toMatchImageSnapshot} = require('jest-image-snapshot');
expect.extend({toMatchImageSnapshot});

beforeAll(async () => {
    await page.goto(url, {waitUntil: 'domcontentloaded'});
    tf.sleep(200);
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
    let dashboardBtn      = "//ul[@class='flexFluid']//li[2]//ul[1]//li[1]//div[1]";
    let workflowsBtn      = "//li[2]//ul[1]//li[2]//div[1]";
    let editModeBtn       = "//ul[@class='flexFluid']//li[4]//ul[1]//li[1]//div[1]";
    let cmmBtn            = "//li[4]//ul[1]//li[2]//div[1]";
    let userProfileBtn    = "//ul[2]//li[2]//ul[1]//li[1]//div[1]";
    let administrationBtn = "//body/div[@id='reactComponent']/div[@class='qAh-BlmoV13gOhT73qD6_ flexRow_center flexRow']/div[@class='_30Q75u6SNFh3Z3Mcws0tmT']/nav[@class='fhzrZozxHiPszfqUV2Iw8 flexCol_nowrap']/ul[2]/li[4]/ul[1]/li[1]/div[1]";

    test('existence of nav buttons', async () => {
        await tf.assertElemExistenceByXpath(dashboardBtn, true);
        await tf.assertElemExistenceByXpath(workflowsBtn, true);
        await tf.assertElemExistenceByXpath(editModeBtn, true);
        await tf.assertElemExistenceByXpath(cmmBtn, true);
        await tf.assertElemExistenceByXpath(userProfileBtn, true);
        await tf.assertElemExistenceByXpath(administrationBtn, true);
    }, timeout);

    test('click on nav buttons', async () => {
        await assertNavigateTo(dashboardBtn, "Dashboard");
        await assertNavigateTo(workflowsBtn, "Workflows");
        await assertNavigateTo(editModeBtn, "Edit mode");
        await assertNavigateTo(cmmBtn, "Content & Media Manager");
    }, timeout);
});
