const testURL = new URL(url + 'modules/moonstone');
const timeout = process.env.SLOWMO ? 40000 : 20000;

const { configureToMatchImageSnapshot } = require('jest-image-snapshot');

const customConfig = { threshold: 0 };
const toMatchImageSnapshot = configureToMatchImageSnapshot({
    customDiffConfig: customConfig,
    customDiffDir: "target/__diff_output__"
});
expect.extend({ toMatchImageSnapshot });


const assertPageTitle = async function (title) {
    await expect(page.title()).resolves.toMatch(title);
};

const assertElemExistence = function (selector, exists) {
    if (exists) {
        return expect(page.$(selector)).resolves.not.toBeNull();
    } else {
        return expect(page.$(selector)).resolves.toBeNull();
    }
};

const assertElemExistenceByXpath = function (xpath, exists) {
    let $x = page.$x(xpath);
    $x.then(element => {
        console.log(xpath + ' resolved to : ', element);
    });
    if (exists) {
        return expect($x).resolves.not.toHaveLength(0);
    } else {
        return expect($x).resolves.toHaveLength(0);
    }
};

/*
    Name will be set to the name of the created .png file that will be the screenshot
 */
async function takeScreenshot(name, width, height) {
    if (width != null && height != null) {
        return await page.screenshot({path: __dirname + '/screenshots/' + name + '.png', clip: {x: 0, y: 0, width: width, height: height}});
    }

    return await page.screenshot({path: __dirname + '/screenshots/' + name + '.png', fullPage: true});
}

async function clickOnElem(selector) {
    try {
        await page.click(selector, {delay: 100});
    } catch (e) {
        return 'failed to click on a button with selector: ' + selector;
    }
}

async function sendKeysToElem(selector, keyStrokes, overwrite) {
    if (overwrite) {
        await page.click(selector, {clickCount: 3, delay: 100});
        await page.type(selector, keyStrokes, {delay: 100});
    } else {
        await page.type(selector, keyStrokes, {delay: 100});
    }
}

async function getElement(selector) {
    try {
        return await page.$(selector);
    } catch (e) {
        return 'failed to find element with selector: ' + selector;
    }
}

async function getElementByXpath(xpath) {
    try {
        return await page.$x(xpath);
    } catch (e) {
        return 'failed to find element with xpath: ' + xpath;
    }
}

async function getElements(selector) {
    try {
        return await page.$$(selector);
    } catch (e) {
        return 'failed to find elements with selector: ' + selector;
    }
}

async function clickOnElementByHandle(elementHandle) {
    try {
        await elementHandle.click({delay: 100});
    } catch (e) {
        return e;
    }
}

async function removeElement(page, selector) {
    await page.evaluate(() => {
        (document.querySelectorAll(selector) || []).forEach(el => el.remove());
    });
}

const sleep = function (milliseconds) {
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
};

async function assertVisibilityOfElementByXpath(xpath, visible) {
    try {
        await page.waitForXPath(xpath, {visible: visible});
    } catch (e) {
        return e
    }

}

async function setPageLang(lang) {
    await page.setExtraHTTPHeaders({
        'Accept-Language': lang
    });
}

module.exports = {
    testURL,
    timeout,
    toMatchImageSnapshot,
    assertPageTitle,
    assertElemExistence,
    takeScreenshot,
    clickOnElem,
    sendKeysToElem,
    getElements,
    getElement,
    clickOnElementByHandle,
    sleep,
    removeElement,
    assertVisibilityOfElementByXpath,
    getElementByXpath,
    assertElemExistenceByXpath,
    setPageLang
};
