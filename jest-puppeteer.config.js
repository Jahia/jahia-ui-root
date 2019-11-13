module.exports = {
    browser: process.env.BROWSER ? process.env.BROWSER : 'chromium',
    launch: {
        headless: false,
        slowMo: process.env.SLOWMO ? process.env.SLOWMO : 500,
        devtools: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: {
            width: 900,
            height: 1200
        }
    }
};
