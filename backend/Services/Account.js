const Account = require("../Model/Account");
const BaseService = require("./BaseService");

class AccountService extends BaseService{
    constructor(){super(Account)}
   
}
module.exports =new AccountService()