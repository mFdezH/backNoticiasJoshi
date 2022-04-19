const puppeteer = require('puppeteer');
const path = require('path');
const websites = require('../websites.json');

( async ()=> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    for(let website of websites){
        console.log("Proceso de Scrapping en la pagina " + website.name);
        const scriptPath = path.join(__dirname, '/scripts', website.scriptName);
        await require(scriptPath)(page, website);
        
        console.log("Proceso de Scrapping finalizado en la pagina " + website.name);
        await page.close();
    }
    await browser.close();
})(); 