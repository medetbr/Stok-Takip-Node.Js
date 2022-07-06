const Supplier = require("../Model/Supplier");
const BaseService = require("./BaseService");

class SupplierService extends BaseService{
    constructor(){super(Supplier)}
   
}
module.exports =new SupplierService()