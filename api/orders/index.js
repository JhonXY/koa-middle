const router = require('koa-router')()
const controller = require('./order.controller')

router.post('/subHotelOrder', controller.subHotelOrder)

module.exports = router