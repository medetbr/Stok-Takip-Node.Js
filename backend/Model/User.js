const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:3
    },
    surname:{
        type:String,
        required:true,
        min:2
    },
    username:{
        type:String,
        required:true,
        unique:true,
        min:3
    },
    password:{
        type:String,
        required:true,
        min:3
    },
    email:{ 
        type:String,
        required:true,
        unique:true,
        min:7
    },
    profileImage:{
        type:String,
    }
},{timestamps:true})

const User = mongoose.model("users",userSchema)
module.exports = User