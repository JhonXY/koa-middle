const router = require('koa-router')()
const controller = require('./shop.controller')

router.post('/subInfos', controller.subInfos)
router.post('/subHostels', controller.subHostels)
router.get('/getHotels', controller.getHotels)
router.get('/getShopsList', controller.getShopsList)

module.exports = router