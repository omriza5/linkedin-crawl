const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const main = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {width: 1920, height: 1080}
    });
    const page = await browser.newPage();
    await page.goto("https://www.linkedin.com/login?fromSignIn=true&trk=nav_header_signin");
    await page.type("#username", "sahrgh1993@gmail.com");
    await page.type("#password", "Omre@sahr2");
    await page.click(".btn__primary--large");
    // console.log(res);
    // setTimeout(async () => {
        await page.goto("https://www.linkedin.com/search/results/people/?company=stealth&geoUrn=%5B%22101620260%22%5D&keywords=ceo%20stealth%20OR%20cto%20stealth%20OR%20co-founder%20stealth&origin=GLOBAL_SEARCH_HEADER&sid=RRG&title=coe%20OR%20cto")
    // }, 5000);


    const htmlContent = await page.content();
    console.log(htmlContent);
    // const $ =  cheerio.load(htmlContent);
    // const list = $(".reusable-search__result-container").map((index,element) =>  {
    //     $(element);
    //     console.log(element);
    // }).get();

    //await page.goto("https://www.linkedin.com/in/timor-salah-aldeen-a831636a/");

    // .reusable-search__entity-result-list.list-style-none
   
    // app-aware-link
    // const names = await page.evaluate(()=>  {
        // const personName = document.querySelectorAll(".reusable-search__result-container")
        // console.log(5);
        // let arr = [];
        // personName.forEach()
    // })

}

main();