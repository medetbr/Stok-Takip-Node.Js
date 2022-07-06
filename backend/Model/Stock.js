const mongoose = require("mongoose")

const stockSchema = new mongoose.Schema({
    product_id:{
        type:mongoose.Types.ObjectId,
        ref:"product",
        required:true,
    },
    supplier_id:{
        type:mongoose.Types.ObjectId,
        ref:"supplier",
    }, 
    account_id:{
        type:mongoose.Types.ObjectId,
        ref:"account",
    },
    type:{
        type:String,
        default:"0",
        enum:["0","1","2"],
    },
    amount:{
        type:String,
        required:true,
    },
    buy:{ 
        type:String,
    },
    sell:{
        type:String,
    }
},{timestamps:true})

const Product = mongoose.model("stock",stockSchema)
module.exports = Product