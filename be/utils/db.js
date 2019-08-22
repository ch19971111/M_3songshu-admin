const mongoose = require('mongoose') // 引入mongoose
mongoose.connect('mongodb://localhost:27017/M_3songshu', { useNewUrlParser: true }) //连接数据库  

module.exports = mongoose