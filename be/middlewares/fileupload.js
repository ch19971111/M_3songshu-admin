const multer  = require('multer')
const path    = require('path')
const stringRandom = require('string-random')  //生成随机的字符串
let filename = ''
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
   
      cb(null, path.resolve(__dirname,'../public/images/')) // 把图片存在什么路径下
    },
    filename: function (req, file, cb) {
      filename =  stringRandom(16) + '-' + Date.now() + file.originalname.substr(file.originalname.indexOf('.'))
      cb(null, filename)
    },
})
function fileFilter(req, file, cb) {
    //console.log(file.mimetype)  // 此方法返回的是文件的类型  image/jpg
    let index = ['image/png','image/gif','image/jpg','image/jpeg'].indexOf(file.mimetype)
    if(index == -1){
        // cb(null,false)
        cb(new Error('文件类型错误'))
    }else{
        cb(null,true)
    }
          
}

  
let upload = multer({ storage,fileFilter }).single('companyLogo')




// module.exports = function(req,res,next){
//     console.log(1)
//     upload.single('companyLogo')
//     req.filename = filename
// }  // 集合名称
module.exports = function(req,res,next){
    upload(req,res,function(err){
        if(err){
            res.render('fail',{
                data:JSON.stringify({
                    mgs:err.message
                })
            })
        }else{
            req.filename = filename
            next()
            filename = ''
        }
    })
}