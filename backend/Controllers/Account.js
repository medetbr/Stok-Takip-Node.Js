const AccountService = require("../Services/Account")
const StockService = require("../Services/Stock");

class Account{
    async create(req,res){
        try {
            const createdAccount = await AccountService.create(req.body)
            res.status(200).json(createdAccount)
        } catch (error) {
            res.status(500).json(error)            
        }
    }
    async getList(req,res){
        let { page, limit, search } = req.query;
        if (!limit) limit = 10;
        if (page < 1) page = 1;
    
        try {      
          const getAccount = await AccountService.list(page, limit, search);      
          res.status(200).json(getAccount)
        } catch (error) {
            res.status(500).json(error)            
        } 
    }
    async getAccountDetail(req,res){
        const {id} = req.params;
        try {
            const accountDetail = await StockService.find({account_id:id})
            res.status(200).json(accountDetail)
        } catch (error) {
          res.status(500).json(error)
        }
    }
    async delete(){
        
    }
    async update(req,res){
        try {
            const data = await AccountService.modify(req.params.id,req.body)      
            res.status(200).json(data)    
          } catch (error) {
              
          }
    }
}
module.exports = new Account()