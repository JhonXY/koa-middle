const router = require('koa-router')()
const controller = require('./user.controller')

router.post('/addUser', controller.addUser)
router.get('/getUser', controller.getUser)

module.exports = router;