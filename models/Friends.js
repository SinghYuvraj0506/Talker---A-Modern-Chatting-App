const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"users"
    },
    friend_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"users"
    },
    isFavorite:{
        type:Boolean,
        default:false
    },
    updatedOn:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('friends',friendSchema)

