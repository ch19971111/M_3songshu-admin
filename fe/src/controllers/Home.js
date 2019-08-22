// 这里我们需要渲染我们的home模板 所以我们需要创建views文件 
import homeViews from '../views/home.art'

export default{
    render(req,res,next){
        //res.render('ok')  //我应该渲染字符串模板 所以我们需要使用到art-template-loader
        res.render(homeViews(res))
    }
}