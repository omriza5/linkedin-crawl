const express = require("express");
const router = express.Router();
const crawl = require("../app/puppeteer");
const { UserModel } = require("../models/model");

router.get("/", async (req, res) => {
  await crawl();
  const users = await UserModel.find();
  res.send(users);
});
module.exports = router;
