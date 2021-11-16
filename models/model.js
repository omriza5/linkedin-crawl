const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const linksSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    },
    image: {
        type: String
    }

});


const UserModel = mongoose.model('user', linksSchema);


module.exports = {
    UserModel: UserModel
}

