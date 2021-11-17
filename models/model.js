const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const linksSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png",
  },
});

const UserModel = mongoose.model("user", linksSchema);

module.exports = {
  UserModel,
};
