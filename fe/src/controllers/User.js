// 此文件是用来控制注册登录的 所以我们需要引入注册登录的模板
import userView from '../views/user.art'
let _url = ''
let _type = ''

export default {
    async render(){
       let result = await this.isSignin() 
       let html =  userView({
           isSignin:result.ret,
           userName:result.data.username
        }) //渲染注册登录
       $('#user').html(html) //放到页面上
       this.bindEventToBtn() // 调用注册登录功能
    },
    bindEventToBtn(){
        $('.hidden-xs').on('click',function(){
            _type  = $(this).attr('id')
            _url   = _type === "signin" ? '/api/users/signin' : '/api/users/signup'
            $('#user-form input').val("")
        })

        $('#btn-submit').on('click',()=>{
            let data = $('#user-form').serialize()
            $.ajax({
                url:_url,
                type:'POST',
                data,
                success:this.bindEventSucc.bind(this)
            })
        })

        $('#signout').on('click',()=>{
            $.ajax({
                url:'/api/users/signout',
                success:this.bindEventSucc.bind(this)
            })
        })
    },
    bindEventSucc(result){
        if(_type === 'signin'){
            if(result.ret){
                // let html =  userView({
                //     isSignin:result.ret,
                //     userName:result.data.username
                // }) 
                // $('#user').html(html) 
                location.reload()
            }else{
                alert(result.data.msg)
            }
        }else if(_type === 'signup'){
                alert(result.data.msg)
        }else{
            location.reload()
        }
    }
    ,
    isSignin(){
       return $.ajax({
            url:'/api/users/isSignin',
            success(result){
                return result
            }
        })
    }

}