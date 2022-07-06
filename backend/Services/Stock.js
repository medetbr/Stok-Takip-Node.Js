const Stock = require("../Model/Stock")
const BaseService = require("./BaseService")

class StockService extends BaseService{

   constructor(){super(Stock)} 

   async getStockOutTotal(product_id){
     const findStocks = await Stock.find({product_id})
     let total =0;
      findStocks.map(stock=>stock.type=="2"? 
          total = total + parseInt(stock.amount) 
          :
          total +=0   
     )
     return total;
   }
   async getStockReceiptTotal(product_id){
      const findStocks = await Stock.find({product_id})
      let total =0;
       findStocks.map(stock=>stock.type!="2"? 
           total = total + parseInt(stock.amount) 
           :
           total +=0   
      )
      return total;
    }
    async find(where){
      return await this.BaseModel.find(where).populate({
        path:"product_id",
        select:"sell stock_no name"
      })
      .populate({
        path:"account_id",
        select:"name"
      })
      .populate({
        path:"supplier_id",
        select:"name"
      })
  }
}

module.exports = new StockService()