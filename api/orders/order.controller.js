const model = require('../../db/model');
// 用于创建jwt
const jwt = require('jsonwebtoken')
const { HotelOrders } = model;

class orderController {
  async subHotelOrder(ctx, next) {
    let data = ctx.request.body
    console.log(data);
    
    const { forOrder } = data;
    delete data.forOrder
    try {
      await HotelOrders.create({ // 店家
        ...data, ...forOrder
      })
      ctx.status = 200
      ctx.body = {
        message: '订单已提交',
        code: 1,
        success: true
      }
    } catch (err) {
      ctx.status = 200
      ctx.body = {
        message: '订单未能提交',
        code: -1,
        success: false
      }
      ctx.throw(err)
    }
  }
}

module.exports = new orderController();