const puppeteer = require('puppeteer');

const mongoose = require('mongoose');
const userModel = require('./models/model')
mongoose.connect('mongodb://localhost/LinkedinDB', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to DB');
});


const main = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { width: 1920, height: 1080 }
    });
    const page = await browser.newPage();
    await page.goto("https://www.linkedin.com/login?fromSignIn=true&trk=nav_header_signin");
    await page.type("#username", "ayalkhanjar@gmail.com", { delay: 100 });
    await page.type("#password", "iyalkhanjar1", { delay: 100 });
    await page.click(".btn__primary--large");
    await page.waitForNavigation()
    await page.goto("https://www.linkedin.com/search/results/people/?company=stealth&geoUrn=%5B%22101620260%22%5D&keywords=ceo%20stealth%20OR%20cto%20stealth%20OR%20co-founder%20stealth&origin=GLOBAL_SEARCH_HEADER&sid=RRG&title=coe%20OR%20cto")
    const grabNames = await page.evaluate(() => {
        const personName = document.querySelectorAll('.reusable-search__result-container')
        let arr = []
        personName.forEach(item => {
            console.log(5);
            const nameInfo = item.querySelector('.reusable-search__result-container span[aria-hidden]')
            const profileLink = item.querySelector('.reusable-search__result-container .app-aware-link').href
            arr.push({ name: nameInfo.innerText, linkedin: profileLink });
            const user = new userModel({
                name: nameInfo.innerText,
                linkedin: profileLink
            })
            user.save().then(data => {
                res.status(200).json(data);
            })

        })
        return arr
    })
    console.log(grabNames);


}
main();