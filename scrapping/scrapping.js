const puppeteer = require('puppeteer');
const path = require('path');
const websites = require('../websites.json');

( async ()=> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for(let i = 0; i <= websites.length ; i++){
        const scriptPath = path.join(__dirname, '/scripts', websites[i].scriptName);
        await require(scriptPath)(page, websites[i]);
    }

    await page.close();
    await browser.close();
})();