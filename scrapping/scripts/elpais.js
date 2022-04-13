module.exports  = async (page, website) => {
    const {selector, name} = website;
    await page.goto(website.url);
    await page.waitForSelector(selector.section);
    const feedText = await page.evaluate((selector)=>{
        const feeds = document.querySelectorAll(selector);
        const feedText = [];
        for(let i = 0; i <= 5; i++){
            feedText.push(
                {
                    "info-feed" : feeds[i].innerText, 
                    "name-newslatter" : name
                }
            )
        }
        return feedText;
    },selector.feed, name)
    console.log(feedText);
    console.log(page, website);
}