const feedModel = require('../../models/feed');
const mongoose = require('mongoose');
module.exports  = async (page, website) => {
    const {selector, name} = website;
    await page.goto(website.url)
    await page.waitForSelector(selector.section);
    await page.waitForSelector(selector.feed);
    await page.waitForSelector(selector.image);
    await page.waitForSelector(selector.urlsource);
    
    const feedText = await page.evaluate((selector, image, source, name)=>{
        const feeds = document.querySelectorAll(selector);
        const feedText = [];
        for(let i = 1; i <= 5; i++){
            feedText.push(
                {
                    infofeed : feeds[i].innerText, 
                    imagefeed : feeds[i].querySelector(image) === null ? '' : feeds[i].querySelector(image).getAttribute('srcset'), 
                    infosource : feeds[i].querySelector(source).getAttribute('href'),
                    namenewslatter : name
                }
            )
        }
        return feedText;
    },selector.feed, selector.image, selector.urlsource, name)
    
    const regExp = new RegExp('[A-z]+');
    const FeedModel = mongoose.model('feeds', feedModel);
    for(const feed of feedText){
        (async () => {
            const textSplited = await feed.infofeed.split('\n').filter((txt) => regExp.test(txt));
            await FeedModel.create({
                'title': textSplited[0],
                'body': textSplited[3],
                'image': feed.imagefeed,
                'source': feed.infosource,
                'publisher': feed.namenewslatter
            });
        })()
    }
}