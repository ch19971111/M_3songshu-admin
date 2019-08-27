var express = require('express');
var router = express.Router();

const Users = require('../controllers/users')
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// }); // 把回调函数抽离到controller里面 同时我们需要用post请求

router.post('/signup',Users.signup)
router.post('/signin',Users.signin)
router.get('/isSignin',Users.isSignin)
// router.get('/signout',Users.signout)
module.exports = router;
