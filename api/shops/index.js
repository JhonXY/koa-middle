const router = require('koa-router')()
const controller = require('./shop.controller')

router.post('/subInfos', controller.subInfos)

module.exports = router