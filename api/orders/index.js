const router = require('koa-router')()
const controller = require('./order.controller')

router.post('/subHotelOrder', controller.subHotelOrder)
router.post('/subFoodOrder', controller.subFoodOrder)
router.get('/getHotelOrder', controller.getHotelOrder)
router.get('/getFoodOrder', controller.getFoodOrder)
router.get('/getAllOrder', controller.getAllOrder)

module.exports = router