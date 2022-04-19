const feedModel = require('../../models/feed');
module.exports  = async (page, website) => {
    const {selector, name} = website;
    await page.goto('http://www.elpais.com');
    await page.waitForSelector(selector.section);
    await page.waitForSelector(selector.image);
    await page.waitForSelector(selector.urlsource);
    await page.waitForSelector(selector.feed);
    const feedText = await page.evaluate((selector, feed, name, image, source)=>{
        const section = document.querySelector(selector)
        const feeds = section.querySelectorAll(feed);
        const feedText = [];
        for(let i = 1; i <= 5; i++){
            console.log(feeds[i].querySelector(source));
            feedText.push(
                {
                    infofeed : feeds[i].innerText, 
                    infosource : feeds[i].querySelector(source) === null ? '' : feeds[i].querySelector(source).getAttribute('href'),
                    imagefeed : feeds[i].querySelector(image) === null ? '' : feeds[i].querySelector(image).getAttribute('srcset'),
                    namenewslatter : name
                }
            )
        }
        return feedText;
    },selector.section, selector.feed, name, selector.image, selector.urlsource)
    const regExp = new RegExp('[A-z]+');
    for(const feed of feedText){
        (async () => {
            const textSplited = await feed.infofeed.split('\n').filter((txt) => regExp.test(txt));
            await feedModel.create({
                'title': textSplited[0],
                'body': textSplited[3],
                'image': feed.imagefeed,
                'source': feed.infosource,
                'publisher': feed.namenewslatter
            }).then(() => console.log("Los datos se han guardado en la BBDD")).catch(err => console.log(err));
        })()
    }
}