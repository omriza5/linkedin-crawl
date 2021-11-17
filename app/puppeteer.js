const puppeteer = require("puppeteer");
const UserModel = require("../models/model").UserModel;

module.exports = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 },
  });
  const page = await browser.newPage();
  await page.goto(
    "https://www.linkedin.com/login?fromSignIn=true&trk=nav_header_signin"
  );
  await page.type("#username", "ayalkhanjar@gmail.com", { delay: 100 });
  await page.type("#password", "iyalkhanjar1", { delay: 100 });
  await page.click(".btn__primary--large");
  await page.waitForNavigation();
  await page.goto(
    `https://www.linkedin.com/search/results/people/?company=stealth&geoUrn=%5B%22101620260%22%5D&keywords=ceo%20stealth%20OR%20cto%20stealth%20OR%20co-founder%20stealth&origin=GLOBAL_SEARCH_HEADER&page=1&title=coe%20OR%20cto`
  );

  const numOfPage = await page.evaluate(async () => {
    const numberOfPAges = document.querySelector(".pb2.t-black--light.t-14");
    return Math.ceil(parseInt(numberOfPAges.innerText.split(" ")[0]) / 10);
  });
  UserModel.collection.drop();
  for (let i = 1; i <= numOfPage; i++) {

    await page.goto(
      `https://www.linkedin.com/search/results/people/?company=stealth&geoUrn=%5B%22101620260%22%5D&keywords=ceo%20stealth%20OR%20cto%20stealth%20OR%20co-founder%20stealth&origin=GLOBAL_SEARCH_HEADER&page=${i}&title=coe%20OR%20cto`
    );

    const grabNames = await page.evaluate(async () => {
      const personName = document.querySelectorAll(
        ".reusable-search__result-container"
      );
      let arr = [];
      personName.forEach(async (item) => {
        const nameInfo = item.querySelector(".reusable-search__result-container span[aria-hidden]").innerText
        const profileLink = item.querySelector(".reusable-search__result-container .app-aware-link").href;

        const ProfileImage = item.querySelector('.ivm-view-attr__img--centered.EntityPhoto-circle-3.lazy-image.ember-view') && item.querySelector('.ivm-view-attr__img--centered.EntityPhoto-circle-3.lazy-image.ember-view').src
        await console.log(ProfileImage)
        arr.push({
          name: nameInfo,
          linkedin: profileLink,
          image: ProfileImage !== undefined ? ProfileImage : "https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png"
        });

      });

      return arr;
    });

    UserModel.insertMany(grabNames);
  }
};
