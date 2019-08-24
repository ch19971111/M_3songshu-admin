var express = require('express');
var router = express.Router();

const Position = require('../controllers/position')
const Users    = require('../controllers/users')
const authMiddlewrares = require('../middlewares/auth')

router.get('/list',authMiddlewrares.auth,Position.list)
router.post('/position_add',authMiddlewrares.auth,Position.add)
router.post('/position_findOne',authMiddlewrares.auth,Position.findOne)
router.patch('/position_edit',authMiddlewrares.auth,Position.edit)
router.delete('/position_remove',authMiddlewrares.auth,Position.remove)

module.exports = router