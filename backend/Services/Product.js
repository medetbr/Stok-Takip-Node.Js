const Product = require("../Model/Product")
const BaseService = require("./BaseService")
const StockService = require("./Stock")

class ProductService extends BaseService{

   constructor(){super(Product)}   
   async list(page,limit,search){    
      let allList = await this.BaseModel.find(search?{name:{$regex:new RegExp(`.*${search}.*`,'i')}}:{}).sort({ createdAt: -1 })
      
      if(limit==="all"){
         for(let product of allList) {
            product.stock = 
           await StockService.getStockReceiptTotal(product._id)-await StockService.getStockOutTotal(product._id)
         };       
         return {
         value:allList
      }} 
      let skip = (parseInt(page)-1)*parseInt(limit)
      let pageLength = allList.length/limit; 
      let findedList = await this.BaseModel.find(search?{name:{$regex:new RegExp(`.*${search}.*`,'i')}}:{}).sort({ createdAt: -1 })
         .skip(skip)
         .limit(limit);   
         for(let product of findedList) {
            product.stock = 
           await StockService.getStockReceiptTotal(product._id)-await StockService.getStockOutTotal(product._id)
         };       
      return {page:Math.ceil(pageLength),value:findedList,total:allList.length}
  }
}

module.exports = new ProductService()