// 路由插件 SME-router
// 引入smeRouter
import SEMRouter from 'sme-router'

const router = new SEMRouter('router-view','hash') // 使用方法是需要先得到实例router 需要传两个参数 第一个是路由 id =>要渲染内容的地方 第二个是路由类型  有hash和HTML5  第二个可以省略 省略是hash

import Home from '../controllers/Home'
import Position from '../controllers/Position'

// sme-router 中间件
router.use((req,res,next )=>{
    $(`.sidebar-menu li.nav a[href="/#${req.url}"]`)  // 根据哈希来确定哪个需要高亮
    .parent()
    .addClass('active')
    .siblings()
    .removeClass('active')
})




router.route('/',Home.render)  // 参数 第一个是哈希 第二个是一个回调函数 我们可以把回调函数抽出为controller文件里面
router.route('/position',Position.render)  //职位的hash处理
router.route('/position_add',Position.addRender)
router.route('/position_edit',Position.editRender)
router.redirect('/')//设置默认的hash值   '/'

