const router = require('koa-router')()
const controller = require('./order.controller')

router.post('/subHotelOrder', controller.subHotelOrder)
router.post('/subFoodOrder', controller.subFoodOrder)
router.get('/getHotelOrder', controller.getHotelOrder)
router.get('/getFoodOrder', controller.getHotelOrder)

module.exports = router