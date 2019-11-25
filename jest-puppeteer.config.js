module.exports = {
    browser: process.env.BROWSER ? process.env.BROWSER : 'chromium',
    launch: {
        headless: process.env.HEADLESS ? process.env.HEADLESS : true,
        slowMo: process.env.SLOWMO ? process.env.SLOWMO : 200,
        devtools: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: {
            width: 900,
            height: 1200
        }
    }
};
