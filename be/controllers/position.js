const posModel = require('../models/position')
const moment   = require('moment')
module.exports = {
    async list(req, res, next) {
      res.set('content-type', 'application/json;charset=utf-8') 
      console.log(req.query)
      let result = await posModel.find(req.query)
      if(await result){
        res.render('succ',{
          data:JSON.stringify({
            list:await result.list,
            total: await result.total
          })
        })
      }
    },
    async add(req,res,next){
      let result = await posModel.save({
        ...req.body,
        createTime: moment().format('YYYY-MM-DD hh:mm:ss')
      })
      if(result){
        res.render('succ',{
          data:JSON.stringify({
            msg:'数据提交成功'
          })
        })
      }else{
        res.render('succ',{
          data:JSON.stringify({
            msg:'数据提交失败'
          })
        })
      }
    },
    async findOne(req,res,next){
      let result = await posModel.findOne(req.body.id)
      if(result){
        res.render('succ',{
          data:JSON.stringify(result)
        })
      }
    },
    async edit(req,res,next){
      console.log(req.body)
      let result = await posModel.edit({
        ...req.body,
        createTime: moment().format('YYYY-MM-DD hh:mm:ss')
      })
      res.render('succ',{
        data:JSON.stringify({
          msg:'信息修改成功'
        })
      })
    },
    async remove(req,res,next){
      let result = await posModel.remove(req.body.id)
      if(result){
        res.render('succ',{
          data:JSON.stringify({
            msg:'信息删除成功'
          })
        })
      }else{
        res.render('fail',{
          data:JSON.stringify({
            msg:'信息删除失败'
          })
        })
      }
    }
  }