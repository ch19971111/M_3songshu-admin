const mongoose =require('../utils/db')

const Model = mongoose.model('positionList',{
    companyName:String,
    positionName:String,
    city:String,
    salary:String,
    createTime:String,
    companyLogo:String
})

module.exports = {
    save(data){
        let model = new Model(data)
        return model.save()
    },
    find({start,step}){
        return {
            list:Model.find({}).sort({_id:-1}).skip(~~start).limit(~~step),
            total:Model.count()
        }
    },
    findOne(id){
        return Model.findOne({_id:id})
    },
    edit(data){
        return Model.update({_id:data.id},data)
    },
    remove(id){
        return Model.remove({_id:id})
    },
    search({keywords}){
        return Model.find({$or:[
            {companyName:keywords},
            {positionName:keywords},
            {city:keywords},
            {salary:keywords}
        ]}).sort({_id:-1})
    }
}