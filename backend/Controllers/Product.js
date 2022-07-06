const ProductService = require("../Services/Product");
const StockService = require("../Services/Stock");
const uuid = require("uuid");
class Product {
  async create(req, res) {
    try {
      let createStockNo = uuid.v4().split("-");
      req.body.stock_no = createStockNo[0] + createStockNo[1];
      const created = await ProductService.create(req.body);
      await StockService.create({
        product_id: created._id,
        amount: created.stock,
        buy: created.buy,
        sell: created.sell,
        supplier_id:req.body.supplier_id,
        account_id:null
      });
      res.status(200).json(created);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async getList(req, res) {
    let { page, limit, search } = req.query;
    if (!limit) limit = 10;
    if (page < 1) page = 1;

    try {      
      const getProduct = await ProductService.list(page, limit, search);      
      res.status(200).json(getProduct)
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async delete(req, res) {
    try {
      await ProductService.remove(req.params.id);
      res.status(200).send("Silme işlemi başarılı");
    } catch (error) {}
  }
  async update(req, res) {
    try {
      const findProduct = await ProductService.findById(req.params.id);
     
      if (req.body.stock){
        const findStock = await StockService.find({
          product_id: req.params.id,
          type: "0",
        });
        findProduct.stock =parseInt(findProduct.stock) - parseInt(findStock[0].amount) + parseInt(req.body.stock);
        findStock[0].amount = req.body.stock;
        findProduct.save()
        await findStock[0].save();
      }
      
      const { stock, ...others } = req.body;
      const data = await ProductService.modify(req.params.id, others);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
module.exports = new Product();
