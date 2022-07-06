const User = require("../Model/User")
const BaseService = require("./BaseService")
const bcrypt = require("bcrypt")

class UserService extends BaseService{

   constructor(){super(User)}
   
   async login(obje){
     const user = await this.findOne({username:obje.username})
     if(user){
        const isPasswordCorrect = await bcrypt.compare(obje.password,user.password)
        if(isPasswordCorrect){
         const {password,...others} = user._doc
         return others
        }
        else{
         throw "şifre yanlış"
        }
     }else{
      throw "böyle bir kullanıcı yok"
     }     
   }
}

module.exports = new UserService()