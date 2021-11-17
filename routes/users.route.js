const express = require("express");
const router = express.Router();

const { UserModel } = require("../models/model");

router.get("/", async (req, res) => {
  const users = await UserModel.find();
  res.send(users);
});
module.exports = router;
