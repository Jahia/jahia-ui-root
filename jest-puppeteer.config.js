module.exports = {
    browser: process.env.BROWSER ? process.env.BROWSER : 'chromium',
    launch: {
        headless: proccess.env.HEADLESS ? proccess.env.HEADLESS : true,
        slowMo: process.env.SLOWMO ? process.env.SLOWMO : 200,
        devtools: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: {
            width: 900,
            height: 1200
        }
    }
};
