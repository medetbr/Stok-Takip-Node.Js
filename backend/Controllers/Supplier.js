const SupplierService = require("../Services/Supplier")
class Supplier{
    async create(req,res){
        try {
            const created = await SupplierService.create(req.body)
            res.status(200).json(created)
        } catch (error) {
            
        }
    }
    async getList(req,res){
        let {page,limit,search} = req.query;
        if(!limit) limit = 10
        if(page<1) page=1 
               
        try {
            const getSupplier = await SupplierService.list(page,limit,search)
            res.status(200).json(getSupplier)
        } catch (error) {
            
        }
    }
    async delete (req,res){        
        try {
          await SupplierService.remove(req.params.id)      
          res.status(200).send("Silme işlemi başarılı")    
        } catch (error) {
            
        }
    }
    async update(req,res){
        try {
            const data = await SupplierService.modify(req.params.id,req.body)      
            res.status(200).json(data)    
          } catch (error) {
              
          }
    }
}
module.exports = new Supplier()