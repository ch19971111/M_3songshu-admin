var express = require('express');
var router = express.Router();

const Position = require('../controllers/position')
const Users    = require('../controllers/users')

router.get('/list',Users.isSignin,Position.list)

module.exports = router