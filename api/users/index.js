const router = require('koa-router')()
const controller = require('./user.controller')

router.post('/register', controller.register)
router.get('/login', controller.login)

module.exports = router;