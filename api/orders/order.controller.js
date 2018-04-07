const model = require('../../db/model');
// 用于创建jwt
const jwt = require('jsonwebtoken')
const { HotelOrders } = model;

class orderController {
  // 上传订单
  async subHotelOrder(ctx, next) {
    let data = ctx.request.body 
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

  // 获取账号的订单
  async getHotelOrder(ctx, next) {
    console.log('getorders');
    
    const { userId, status } = ctx.query

    console.log(userId, status);
    
    try {
      let data
      status == -1 
        ? data = await HotelOrders.findAll({ where: { userId } })
        : data = await HotelOrders.findAll({ where: { userId, status } })
      console.log(data);
      
      ctx.status = 200
      ctx.body = {
        data,
        message: '全部订单已获取',
        code: 1,
        success: true
      }
    } catch (err) {
      ctx.status = 200
      ctx.body = {
        message: '订单未能获取',
        code: -1,
        success: false
      }
      ctx.throw(err)
    }
  }
}

module.exports = new orderController();