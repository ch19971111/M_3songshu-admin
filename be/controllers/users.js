
const userModel = require('../models/users')
const tools    = require('../utils/tools')
module.exports = {
    // 注册的逻辑  我需要操作数据库 所以我们需要利用mongoose进行控制 我们需要在创建一个文件专门负责连接数据库
    async signup(req,res,next){
        res.set('content-type', 'application/json;charset=utf-8')
        let {username,password} = req.body
        // let newPassword = await tools.crypt(password)
        // let result = await userModel.save({
        //     username,
        //     password:newPassword
        // })  // 由于返回的是一个promise 所以我们需要用async 和 await接收
        //  我们还需要对数据进行加密 所以应用了另一个插件 bcrypt 
        // console.log(result)    
        // res.render('succ',)
        // res.render('succ', {
        //     data: JSON.stringify({
        //       msgs: '用户注册成功~'
        //     })
        //   })

        // 我们需要进行一个判断 判断是否已经存在这个用户名  没有的话 我们才能进行保存数据到数据库
        let result = await userModel.findOne(username) //  有的话 是会返回这个用户的信息的  没有的话 是会返回null的
        if(result){
          res.render('fail',{
            data: JSON.stringify({
              msg:'用户名已存在'
            })
          })
        }else{
          let newPassword = await tools.crypt(password)
          await userModel.save({
            username,
            password:newPassword
          }) 
          res.render('succ',{
            data: JSON.stringify({
              msg:'注册成功，请登录'
            })
          })

        }
    },
    // 登录逻辑 需要获取到username 进行对比 有的话就对比密码是否一致 所以我需要取到这一条数据
    async signin(req,res,next){
      res.set('content-type', 'application/json;charset=utf-8') 
      let {username,password} = req.body
      let result = await userModel.findOne(username)
      if(!result){
        res.render('fail',{
          data:JSON.stringify({
            msg:'账号或密码输入有误，请重新输入'
          })
        })
      }else{ // 账号存在的话  需要进行密码的对比 参考文档 bcrypt
        // let s = await tools.compare(password,result.password)  //返回的是布尔值
        if(await tools.compare(password,result.password)){
          // 登录成功之后还需要设置cookie
          req.session.username = username
          res.render('succ',{
            data:JSON.stringify({
              msg:'登录成功',
              username
            })
          })
        }else{
          res.render('fail',{
            data:JSON.stringify({
              msg:'账号或密码输入有误，请重新输入'
            })
          })
        }
      }
    },
    // 利用保存cookie 的方式来验证是否登录 这里用到了第三方中间件 cookie-session  配置见文档 或者app.js
    isSignin(req,res,next){
      res.set('content-type', 'application/json;charset=utf-8') 
      let username = req.session.username
      if(username){
        if(req.url == '/isSignin'){
          res.render('succ',{
            data:JSON.stringify({
              msg:'有权限',
              username
            })
          })
        }else{
          next()
        }
         
      }else{
        res.render('fail',{
          data:JSON.stringify({
            msg:'没有权限'
          })
        })
      }
    },
    // 退出  退出之后需要把cookie删除
    signout(req,res,next){
      res.set('content-type', 'application/json;charset=utf-8') 
      req.session  = null  // 删除cookie 的方法
      res.render('succ',{
        data:JSON.stringify({
          msg:'退出成功'
        })
      })
    }
}