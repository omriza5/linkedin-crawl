const express = require("express");
const router = express.Router();
const crawl = require("../app/puppeteer")();

router.get("/", async (req, res) => {
  //   crawl();
  res.send("Hello World");
});
module.exports = router;
