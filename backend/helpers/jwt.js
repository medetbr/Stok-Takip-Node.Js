const JWT = require("jsonwebtoken")

const signAccessToken = (data)=>{
   return new Promise((resolve,reject)=>{
    const payload = {
        ...data,
    }
    const options = {
        expiresIn:"10d"
    }
    JWT.sign(payload,process.env.ACCESS_TOKEN_SECRET_KEY,options,(err,token)=>{
        if(err) reject(err)
        resolve(token)
    })
   })
}

const verifyAccessToken = (req,res,next)=>{
    const authorizationToken = req.headers["authorization"]
    if(!authorizationToken) return res.status(401).send("Bu işlemi yapabilmek için giriş yapmanız gerekiyor")
    JWT.verify(authorizationToken.split(" ")[1],process.env.ACCESS_TOKEN_SECRET_KEY,(err,payload)=>{
        if (err) { return res.status(403).send({ error: "Bu tokenin süresi bitmiş." })}
        req.payload = payload
        next()
    })
}
const signRefreshToken = (user_id)=>{
    return new Promise((resolve,reject)=>{
        const payload = {
            user_id,
        }
        const options = {
			expiresIn: "180d",
		};

		JWT.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, options, (err, token) => {
            if (err) reject(err);
        
            resolve(token);
		});
       
    })
}
const verifyRefreshToken = async (refres_token)=>{
        return new Promise(async (resolve,reject)=>{
            JWT.verify(refres_token,process.env.REFRESH_TOKEN_SECRET_KEY,async(err,payload)=>{
                if (err) reject(err);
                const {user_id} = payload;
                if (refresh_token === user_token) {
					return resolve(user_id);
				}
            })
        })
}

module.exports = {
    signAccessToken,
    verifyAccessToken,
    signRefreshToken,
    verifyRefreshToken
}