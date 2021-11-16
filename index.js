const puppeteer = require('puppeteer');

const mongoose = require('mongoose');
const UserModel = require('./models/model').UserModel

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to DB');
    });


const main = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { width: 1920, height: 1080 }
    });
    const page = await browser.newPage();
    await page.goto("https://www.linkedin.com/login?fromSignIn=true&trk=nav_header_signin");
    await page.type("#username", "omriza5@gmail.com", { delay: 100 });
    await page.type("#password", "Amosh@10", { delay: 100 });
    await page.click(".btn__primary--large");
    await page.waitForNavigation()
    await page.goto(`https://www.linkedin.com/search/results/people/?company=stealth&geoUrn=%5B%22101620260%22%5D&keywords=ceo%20stealth%20OR%20cto%20stealth%20OR%20co-founder%20stealth&origin=GLOBAL_SEARCH_HEADER&page=1&title=coe%20OR%20cto`)

    const numOfPage = await page.evaluate(async () => {
        const numberOfPAges = document.querySelector('.pb2.t-black--light.t-14')
        return Math.ceil(parseInt(numberOfPAges.innerText.split(" ")[0]) / 10)
    })

    for (let i = 1; i <= numOfPage; i++) {
        await page.goto(`https://www.linkedin.com/search/results/people/?company=stealth&geoUrn=%5B%22101620260%22%5D&keywords=ceo%20stealth%20OR%20cto%20stealth%20OR%20co-founder%20stealth&origin=GLOBAL_SEARCH_HEADER&page=${i}&title=coe%20OR%20cto`)
        const grabNames = await page.evaluate(async () => {
            const personName = document.querySelectorAll('.reusable-search__result-container')
            let arr = []
            personName.forEach(async item => {
                const nameInfo = item.querySelector('.reusable-search__result-container span[aria-hidden]')
                const profileLink = item.querySelector('.reusable-search__result-container .app-aware-link').href
                const profileImg = item.querySelector('.ivm-view-attr__img--centered.EntityPhoto-circle-3').src
                arr.push({ name: nameInfo.innerText, linkedin: profileLink, image: profileImg });
            })
            return arr
        })
        UserModel.insertMany(grabNames)

    }
}
main();