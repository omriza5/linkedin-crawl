const express = require("express");
const router = express.Router();
const crawl = require("../app/puppeteer");

router.get("/", async (req, res) => {
  await crawl();
  res.status(200).send("Ok");
});
module.exports = router;
