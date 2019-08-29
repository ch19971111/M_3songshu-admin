const posModel = require('../models/position')
const moment   = require('moment')
module.exports = {
    async list(req, res, next) {
      res.set('content-type', 'application/json;charset=utf-8') 
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
        createTime: moment().format('YYYY-MM-DD hh:mm:ss'),
        companyLogo:req.filename
      })
      // console.log(req.filename,result.companyLogo)
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
      console.log(req.body,req.filename)
      let data  = {
        ...req.body,
        createTime: moment().format('YYYY-MM-DD hh:mm:ss'),
      }
     if(req.filename != ''){
       data.companyLogo = req.filename
     }else{
       delete data.companyLogo
     }
      let result = await posModel.edit(data)
      if(result){
        res.render('succ',{
          data:JSON.stringify({
            msg:'信息修改成功'
          })
        })
      }
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
    },
    async search(req,res,next){
      let result = await posModel.search(req.body)
     if(result){
      res.render('succ',{
        data:JSON.stringify({
          list : result,
          total : -1
        })
      })
     }
    },
    async findAll(req,res,next){
      let result = await posModel.findAll()
      if(result){
        res.render('succ',{
          data:JSON.stringify({
            list : result
          })
        })
      }
    }
  }