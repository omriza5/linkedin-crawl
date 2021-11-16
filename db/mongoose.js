const mongoose = require("mongoose");
require("dotenv").config();

module.exports = () => {
  mongoose.connect(
    "mongodb+srv://sahrj:123sahr@cluster0.rlcnq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to DB");
    }
  );
};
