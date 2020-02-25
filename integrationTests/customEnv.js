// // puppeteer_environment.js
// const NodeEnvironment = require('jest-environment-node');
// const puppeteer = require('puppeteer');
// const _chalk = require('chalk');
// let _readConfig = require("./readConfig");
//
//     class PuppeteerEnvironment extends NodeEnvironment {
//     constructor(config) {
//         super(config);
//         console.log(_chalk.green('Constructing puppeteer env'));
//     }
//
//     async setup() {
//         await super.setup();
//         console.log(_chalk.green('Setting up puppeteer in customEnv.js'));
//         if (!process.env.PUPPETEER_WS_ENDPOINT) {
//             throw new Error('wsEndpoint not found');
//         }
//         const config = await (0, _readConfig.readConfig)();
//         const puppeteer = (0, _readConfig.getPuppeteer)(config);
//         console.log(_chalk.green('Setting up puppeteer'), config.launch);
//         let browser = await puppeteer.launch(config.launch);
//         // store the browser instance so we can teardown it later
//         // this global is only available in the teardown but not in TestEnvironments
//         global.__BROWSER_GLOBAL__ = browser;
//         global.browser = browser;
//         process.env.PUPPETEER_WS_ENDPOINT = browser.wsEndpoint();
//
//         // connect to puppeteer
//         this.global.browser = await puppeteer.connect({
//             browserWSEndpoint: process.env.PUPPETEER_WS_ENDPOINT,
//         });
//     }
//
//         async teardown() {
//         await super.teardown();
//         if (this.global.browser) {
//             await this.global.browser.disconnect();
//         }
//     }
//
//     runScript(script) {
//         return super.runScript(script);
//     }
// }
//
// module.exports = PuppeteerEnvironment;

// puppeteer_environment.js
const NodeEnvironment = require('jest-environment-node');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const os = require('os');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

class PuppeteerEnvironment extends NodeEnvironment {
    constructor(config) {
        super(config);
    }

    async setup() {
        await super.setup();
        // get the wsEndpoint
        const wsEndpoint = fs.readFileSync(path.join(DIR, 'wsEndpoint'), 'utf8');
        if (!wsEndpoint) {
            throw new Error('wsEndpoint not found');
        }

        // connect to puppeteer
        this.global.__BROWSER__ = await puppeteer.connect({
            browserWSEndpoint: wsEndpoint,
        });
    }

    async teardown() {
        await super.teardown();
    }

    runScript(script) {
        return super.runScript(script);
    }
}

module.exports = PuppeteerEnvironment;
