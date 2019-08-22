import positionViews from '../views/position.art'
export default{
    render(req,res,next){
        $.ajax({
            url:'/api/position/list',
            success(result){
                if(result.ret){
                    console.log(result.data)
                    res.render(positionViews({
                        list:result.data
                    }))
                }else{
                    res.go('/')
                }
            }

        })
        res.render(positionViews(req))
    }
}