const mongoose =require('../utils/db')
const Users = mongoose.model('users',{
    username:String,
    password:String
})

module.exports = {
    save({username,password}){
        const users = new Users({
            username,
            password
        })
        return users.save() // 返回的是一个promis
    },
    findOne(username){
        return Users.findOne({username})
    }
    
}