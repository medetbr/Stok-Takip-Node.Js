const mongoose = require("mongoose")

const supplierSchema = new mongoose.Schema({
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
    address:{
        type:String,
        required:true,
    },
    email:{ 
        type:String,
        required:true,
        unique:true,
        min:7
    },
    phoneNumber:{
        type:String,
        required:true
    }
},{timestamps:true})

const Supplier = mongoose.model("supplier",supplierSchema)
module.exports = Supplier