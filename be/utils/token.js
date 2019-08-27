const jwt = require('jsonwebtoken')
const fs  = require('fs')
const path = require('path')

module.exports = {
    tokenSign (username){
        let privateKey = fs.readFileSync(path.resolve(__dirname,'./keys/rsa_private_key.pem'))
        let token = jwt.sign({username},privateKey,{ algorithm: 'RS256'})
        return token
    },
    tokenVerify(token){
        return new Promise((resolve,reject)=>{
            let publicKey = fs.readFileSync(path.resolve(__dirname,'./keys/rsa_public_key.pem'))
            jwt.verify(token,publicKey,(err,decoded)=>{
                if(err){
                    resolve(false)
                }else{
                    resolve(decoded)
                }
            })
        })
    }

}