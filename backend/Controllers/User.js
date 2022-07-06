const UserService = require("../Services/User")
const bcrypt = require("bcrypt")
const path = require("path")
const JWT = require("jsonwebtoken")
const eventEmitter = require("../scripts/event/eventEmitter")
const uuid = require("uuid")
// const fs = require("fs")
const { signAccessToken, signRefreshToken } = require("../helpers/jwt")

class User{

    async register(req,res){
        try {
        const isHaveUsername = await UserService.findOne({username:req.body.username})
        const isHaveEmail = await UserService.findOne({email:req.body.email})
        if(isHaveUsername) return res.status(500).json({message:"Bu kullanıcı adına sahip zaten bir kulanıcı var"})
        if(isHaveEmail) return res.status(500).json({message:"Bu email adresine sahip zaten bir kulanıcı var"})

        req.body.password = await bcrypt.hash(req.body.password,8)
        const createdUser = await UserService.create(req.body)
        const {password,...others} = createdUser._doc
        const accessToken = await signAccessToken({
            user_id:others._id,
            username:others.username
        })
        const refreshToken = await signRefreshToken(others._id);
        res.status(200).json({user:others,accessToken,refreshToken})
        } catch (error) {
        res.status(500).json({message:error})            
        }      
    }

    async login(req,res){
        try {
          const userIsLoggedIn = await UserService.login({username:req.body.username,password:req.body.password})
          const accessToken = await signAccessToken({
            user_id:userIsLoggedIn._id
        })
        const refreshToken = await signRefreshToken(userIsLoggedIn._id);	
        res.status(200).json({user:userIsLoggedIn,accessToken,refreshToken})
        } catch (error) {
          res.status(500).json({message:error})
        }
    }

    async update(req,res){
        try {
            const updatedUser = await UserService.modify(req.params.id,req.body)
            const {password,...others} = updatedUser._doc
            res.status(200).json(others)
        } catch (error) {
          res.status(500).json({message:error})            
        }
    }
    async delete(req,res){
        try {
           const deletedUser = await UserService.remove(req.params.id)
           if(!deletedUser) throw "Böyle bir kullanıcı yok"
           res.status(200).send("Kullanıcı başarılı bir şekilde silindi")           
        } catch (error) {
          res.status(500).json({message:error})            
        }
    }
    async me(req,res){
        try {
            const { user_id } = req.payload;
            const user = await UserService.findById(user_id)
            const {password,...others} = user._doc;
            res.status(200).json(others)        
        } catch (error) {
          res.status(500).json({message:error})            
        }
    }
    async profileImageUpload(req,res){   
        try {
            const { user_id } = req.payload;
            const extension = path.extname(req.files.image.name)
            const folderPath = path.join(__dirname, "../uploads", `${user_id+uuid.v4()+extension}` )
            req.files.image.mv(folderPath, (err) => {
                if (err) return res.status(500).send(err);
                   let fileName = folderPath.split("uploads")
                   UserService.modify(user_id,{profileImage:fileName[1]})
                   res.status(200).send("Profil fotoğrafı güncellendi")
            })
        } catch (error) {
            res.status(500).json({message:error}) 
        }              
    }
    async sendPasswordLinkToEmail(req,res){   
        try {
            // const newPassword = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 6);
            const user = await UserService.findOne({email:req.body.email})
            if(!user) return res.status(500).send({message:"Bu maile ait bir hesap bulunamadı"})
            JWT.sign({email:user.email,id:user._id},process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:"7m"},(err,token)=>{
                if(err) return res.status(500).json({message:err})
                const link = `http://localhost:3000/reset-password/${user._id}/${token}`
                
               eventEmitter.emit('send_email',{
                    to:user.email,
                    subject:"Şifre Sıfırlama",                    
                    html:`Şifreniz başarılı bir şekilde sıfırlanmıştır. <br>
                     Yeni şifrenizi oluşturmak için aşağıdaki linke tıklayın <br>
                    <br>${link}`
                })
                res.status(200).send({message:"Şifreniz sıfırlanmıştır. Email adresinizi kontrol ediniz."})
            })
            
            
        } catch (error) {
            res.status(500).json({message:error}) 
        }              
    }
    async resetPassword(req,res){  
        const {id,token} = req.params; 
        const {password,confirmPassword} = req.body; 
        try {
            const user = await UserService.findById(id)
            if(!user) return res.status(500).send("Geçersiz id")
            if(password.toString()===confirmPassword.toString()){
            JWT.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY,async(err,payload)=>{
                if (err) { return res.status(403).send({ message: "Bu işlem zaman aşımına uğramıştır." })}
                await UserService.modify(id,{password:await bcrypt.hash(password,8)})
                res.status(200).send("Şifreniz başarılı bir şekilde güncellenmiştir") })
            }else{res.status(500).send("Girdiğiniz şifreler eşleşmiyor")}    
        } catch (error) {
            res.status(500).json({message:error}) 
        }              
    }
    async checkToken(req,res,next){
        const {token} = req.body;
        if(!token) return res.status(401).send({error:"Token Error"})
        JWT.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY,(err,payload)=>{
            if (err) { return res.status(403).send({error:"Bu sayfaya erişiminiz kapatılmıştır."})}
            next()
        })
    }
    // async profileImageDelete(req,res){   
    //     try {        
    //         const { user_id } = req.payload;
    //         const extension = path.extname(req.files.image.name)            
    //         const folderPath = path.join(__dirname, "../uploads", `${user_id+extension}`)
    //          fs.unlink(folderPath,(err)=>{
    //          if(err) return res.status(500).json("Silme esnasında bir hata oluştu")
    //          UserService.modify(user_id,{profileImage:""})   
    //          res.status(200).send("Profil fotoğrafı silindi")
    //          }) 
                  
    //     } catch (error) {
    //         res.status(500).json({message:error}) 
    //     }              
    // }
}

module.exports = new User()