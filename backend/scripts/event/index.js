const eventEmitter = require("./eventEmitter");
const nodemailer = require("nodemailer")

module.exports =  ()=>{
    eventEmitter.on('send_email',async(emailData)=>{
        let transporter = nodemailer.createTransport({
            service: process.env.EMAIL_HOST,
            auth:{
                user: process.env.EMAIL_USER,
                pass: "qcqyoqmqyknpnics"
            },

        })
        let info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            ...emailData
        },(err)=>{if(err)console.log(err)}) 
    })
}