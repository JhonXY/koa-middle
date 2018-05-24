const router = require('koa-router')()
const controller = require('./shop.controller')

router.post('/subInfos', controller.subInfos)
router.post('/subHostels', controller.subHostels)
router.post('/subFoodItem', controller.subFoodItem)
router.post('/changeFoodItem', controller.changeFoodItem)
router.get('/getFoodItems', controller.getFoodItems)
router.get('/getHotels', controller.getHotels)
router.get('/getShopsList', controller.getShopsList)
router.get('/delFoodItem', controller.delFoodItem)

module.exports = router