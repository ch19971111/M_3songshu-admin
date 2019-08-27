const tokenUtils    = require('../utils/token')

module.exports= {
    async auth(req,res,next){
        res.set('content-type', 'application/json;charset=utf-8') 
        let token  = req.get('x-access-token')
      
        let decoded  = await tokenUtils.tokenVerify(token)
      
        if(decoded){
            next() 
        }else{
          res.render('fail',{
            data:JSON.stringify({
              msg:'没有权限'
            })
          })
        }
      }
}