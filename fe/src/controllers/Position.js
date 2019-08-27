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
    $('#router-view').on('click',"li.direction",function(){
       let _pageNo = $('#router-view li[data-index].active').attr('data-index')
       let _type   = $(this).attr('id')
       if(_type === 'next'){
           if(_pageNo == $('#router-view li[data-index]').length-1){
               _pageNo = ~~_pageNo
           }else{
               _pageNo++
           }
       }else{
            if(_pageNo == 0){
                _pageNo = 0
            }else{
                _pageNo --
            }
       }
       list(_pageNo,res)
    })
    $('#router-view').on('click','#possearch',function(){
        search($('#keywords').val(),res)
    })

}
function addReq(res){
    // let data = $('#possave').serialize()
    $('#possave').ajaxSubmit({
        url: '/api/position/position_add',
        type:'POST',
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
    $('#possave').ajaxSubmit({
        url: '/api/position/position_edit',
        type:'PATCH',
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
                list(res.pageNo,res)
            }else{
                alert(result.data.msg)
            }
        }
    })
}
function list(pageNo,res){
    res.pageNo = pageNo
    $.ajax({
        url:'/api/position/list',
        data:{
            start:pageNo*step,
            step:step
        },
        success(result){
            if(result.ret){
                if(result.data.list.length == 0 && res.pageNo != 0){
                    res.pageNo --
                    list(res.pageNo,res)
                }


                res.render(positionViews({
                    list:result.data.list,
                    total: _.range(Math.ceil(result.data.total / step)),
                    pageNo,
                    listLength: result.data.list.length
                }))
            }else{
                res.go('/home')
            }
        }
    })
    if(_flag) {
        bindEvent(res)
        _flag = false
     }
}
function search(data,res){
    $.ajax({
        url:'/api/position/position_search',
        type:"POST",
        data:{
            keywords:data
        },
        success(result){
            res.render(positionViews({
                list:result.data.list,
                total:result.data.total,
                listLength:result.data.list.length
            }))
        }
    })
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