const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        default:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
    },
    tagline:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
    },
    age:{
        type:Number,
    },
    LastVisited:{
        type:Date,
        default:Date.now
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('users',userSchema)

