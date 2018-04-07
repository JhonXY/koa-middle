const router = require('koa-router')()
const controller = require('./order.controller')

router.post('/subHotelOrder', controller.subHotelOrder)
router.get('/getHotelOrder', controller.getHotelOrder)

module.exports = router