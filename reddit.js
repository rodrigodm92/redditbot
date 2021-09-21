const puppeteer = require('puppeteer');
const SUBREDDIT_URL = (reddit) => `https://old.reddit.com/r/${reddit}/`;


const self = {
    browser: null,
    pages: null,

    initialize: async(reddit) => {
        self.browser = await puppeteer.launch({
            headless: false
        });
        self.page = await self.browser.newPage();

        /*go to subreddit*/
        await self.page.goto(SUBREDDIT_URL(reddit), {waitUntil: 'networkidle0' });
      
    },

    getResults: async (nr) => {
        let elements = await self.page.$$('#siteTable > div[class*="thing"]');
        let results = [];
        for(let element of elements){

            let title = await element.$eval(('p[class="title"]'), node => node.innerText.trim());
            let rank = await element.$eval(('p[class="rank"]'), node => node.innerText.trim());
            let postTime = await element.$eval(('p[class="tagline"] > time'), node => node.getAttribute('title'));
            let authorUrl = await element.$eval(('p[class="tagline"] > a[class*="author"]'), node => node.getAttribute('href'));
            let authorName = await element.$eval(('p[class="tagline"] > a[class*="author"]'), node => node.innerText.trim());
            let score = await element.$eval(('div[class="score likes"]'), node => node.innerText.trim());
            let comments = await element.$eval(('a[data-event-action="comments"]'), node => node.innerText.trim());

            results.push({
                title,
                rank,
                postTime,
                authorUrl,
                authorName,
                score,
                comments
            })
        }
        return results;
    }

}

module.exports = self;