const mongoose = require("mongoose");
const moment = require("moment")

const messageSchema = new mongoose.Schema({
    reciever_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"users"
    },
    sender_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"users"
    },
    message:{
        type:String,
        required:true
    },
    created:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('messages',messageSchema)

