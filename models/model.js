const mongoose = require('mongoose');

const linksSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
   linkedin:{
       type:String,
       required:true
   },
   image:{
       type:String
   }
    
});


const UserModel = mongoose.model('user', linksSchema);


module.exports = {
    UserModel
}

