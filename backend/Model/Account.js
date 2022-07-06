const mongoose = require("mongoose")

const accountSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    surname:{
        type:String,
        required:true,
    },
    tc_number:{
        type:String,
        required:true,
    },
    phone_number:{
        type:String,
        required:true,
    },
    iban_number:{
        type:String,
        required:true,
    },    
    
},{timestamps:true})

const Account = mongoose.model("account",accountSchema)
module.exports = Account