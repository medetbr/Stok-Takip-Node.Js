const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    stock_no:{
        type:String,
        required:true,
    },
    buy:{
        type:String,
        required:true,
    },
    sell:{ 
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    stock:{
        type:String,
        required:true
    }
},{timestamps:true})

const Product = mongoose.model("product",productSchema)
module.exports = Product