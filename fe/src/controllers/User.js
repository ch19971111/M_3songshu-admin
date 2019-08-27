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
        $('#user').on('click','.hidden-xs',function(){
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

        $('#user').on('click','#btn-signout',()=>{
            // $.ajax({
            //     url:'/api/users/signout',
            //     success:this.bindEventSucc.bind(this)
            // })
            localStorage.removeItem('x-access-token')
            location.reload()
        })
    },
    bindEventSucc(result,textStatus, jqXHR){
        if(_type === 'signin'){
            if(result.ret){
                let token = jqXHR.getResponseHeader('x-access-token')
                localStorage.setItem('x-access-token',token)
                let html =  userView({
                    isSignin:result.ret,
                    userName:result.data.username
                }) 
                $('#user').html(html) 
                // this.isSignin()
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
            headers:{
                'x-access-token': localStorage.getItem('x-access-token'),
            },
            success(result){
                return result
            }
        })
    }

}