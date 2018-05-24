const router = require('koa-router')()
const controller = require('./user.controller')

router.post('/register', controller.register)
router.post('/alipay', controller.alipay)
router.post('/changePassword', controller.changePassword)
router.get('/login', controller.login)
router.get('/hasShop', controller.hasShop)

module.exports = router;