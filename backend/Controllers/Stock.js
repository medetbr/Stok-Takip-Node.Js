const StockService = require("../Services/Stock");
class Stock {
  async create(req, res) {
    try {      
        if ((req.body.type == "1"||req.body.type == "2" )&&parseInt(req.body.amount)>0) {
          let createdStock;
          let totalStock =
          await StockService.getStockReceiptTotal(req.body.product_id)-await StockService.getStockOutTotal(req.body.product_id)
          
          if(req.body.type == "2"&&totalStock>=req.body.amount){
            createdStock = await StockService.create(req.body);
          }
          if(req.body.type == "1"){
            createdStock = await StockService.create(req.body);
          } 
          res.status(200).json(createdStock);
          }                
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  async getList(req, res) {
    try {
      const { id } = req.params;
      const getStock = await StockService.find({ product_id: id });
      res.status(200).json(getStock);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  async delete(req, res) {
    try {
      await StockService.remove(req.params.id);
      res.status(200).send("Silme işlemi başarılı");
    } catch (error) {}
  }
  async update(req, res) {
    try {     
      if(req.body.amount<0)return res.status(500).json({ message: error.message });
      const findStock = await StockService.findById(req.params.id)
      let totalStock =
          await StockService.getStockReceiptTotal(req.body.product_id)-await StockService.getStockOutTotal(req.body.product_id)
          
        if(req.body.type!="2"&&req.body.amount<findStock.amount){
          if(totalStock-(findStock.amount-req.body.amount)<0){
            return res.status(500).json({ message: "Ürünün stoğu eksiye gidemez" });
          }   
        }else if(req.body.type=="2"&&req.body.amount>findStock.amount){
          if((totalStock-(parseInt(req.body.amount) -parseInt(findStock.amount))<0)){
            return res.status(500).json({ message: "Ürünün stoğu eksiye gidemez" });
          } 
        }  
         
      const data = await StockService.modify(req.params.id, req.body);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
module.exports = new Stock();
