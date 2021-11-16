const puppeteer = require('puppeteer');

const main = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {width: 1920, height: 1080}
    });
    const page = await browser.newPage();
    await page.goto("https://www.linkedin.com/login?fromSignIn=true&trk=nav_header_signin");
    await page.type("#username", "miishmohim@gmail.com");
    await page.type("#password", "123456AP");
    await page.click(".btn__primary--large.from__button--floating");
    setTimeout(async () => {
        await page.goto("https://www.linkedin.com/search/results/people/?network=%5B%22F%22%5D&origin=MEMBER_PROFILE_CANNED_SEARCH&sid=g3s")
    }, 5000);
    //await page.goto("https://www.linkedin.com/in/timor-salah-aldeen-a831636a/");

}

main();