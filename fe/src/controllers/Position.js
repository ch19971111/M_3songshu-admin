import positionViews from '../views/position.art'
import positionAddViews from '../views/position_add.art'
import positionEditViews from '../views/position_edit.art'
import _ from 'lodash'

let _type = ''
function bindEvent(res){
    $('#router-view').on('click','#position-add',function(){
        _type = 'add'
        res.go('/position_add')
    })
    $('#router-view').on('click','#posback',function(){
        res.back()
    })
    $('#router-view').on('click','#possubmit',function(){
        if(_type == 'add'){
            addReq(res)
        }else{
            editSubmit(res,this)
        }
    })
    $('#router-view').on('click','#edit',function(){
        _type = 'edit'
        res.go('/position_edit',{ele:this})
    })
    $('#router-view').on('click',"#remove",function(){
        remove(res,this)
    })
    $('#router-view').on('click',"li[data-index]",function(){
        list($(this).attr('data-index'),res)
    })
}
function addReq(res){
    let data = $('#possave').serialize()
    $.ajax({
        url: '/api/position/position_add',
        type:'POST',
        data,
        success(result){
            if(result){
                res.back()
            }else{
                alert(result.data.msg)
            }
        }
    })
}
function editFindOne(req,res){
    return $.ajax({
        url:'/api/position/position_findOne',
        type:'POST',
        data:{
            id:$(req.body.ele).attr('data-id')
        },
        success(result){
           return result
        }
    })
}
function editSubmit(res,ele){
    let data = $('#possave').serialize()
    $.ajax({
        url: '/api/position/position_edit',
        type:'PATCH',
        data:data + '&id=' + $(ele).attr('data-id'),
        success(result){
            if(result){
                res.back()
            }else{
                alert(result.data.msg)
            }
        }
    })
}
function remove(res,ele){
    $.ajax({
        url:'/api/position/position_remove',
        type:'DELETE',
        data:{
            id:$(ele).attr('data-id')
        },
        success(result){
            if(result.ret){
                res.go('/position'+"?_="+ Date.now())
            }else{
                alert(result.data.msg)
            }
        }
    })
}
function list(pageNo,res){
    $.ajax({
        url:'/api/position/list',
        data:{
            start:pageNo*step,
            step:step
        },
        success(result){
            if(result.ret){
                res.render(positionViews({
                    list:result.data.list,
                    total: _.range(Math.ceil(result.data.total / step)),
                    pageNo
                }))
            }else{
                res.go('/')
            }
        }
    })
    res.render(positionViews())
    if(_flag) {
        bindEvent(res)
        _flag = false
     }
}



let _flag = true
const step = 5
export default{
    render(req,res,next){
        list(0,res)
    },
    addRender(req,res,next){
        res.render(positionAddViews())
    },
   async editRender(req,res,next){
        let result =  await editFindOne(req,res)
        let data   = result.data
        res.render(positionEditViews(data))
    }
}