const model = require('../../db/model');
// 用于创建jwt
const jwt = require('jsonwebtoken')
const { HotelOrders, FoodOrders } = model;

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

  // 获取账号的床位订单
  async getHotelOrder(ctx, next) {
    const { userId, status } = ctx.query
    
    try {
      let data
      status == -1 
        ? data = await HotelOrders.findAll({ 
          where: { userId },
          order: [['updatedAt', 'DESC']]
        })
        : data = await HotelOrders.findAll({ 
          where: { userId, status },
          order: [['updatedAt', 'DESC']]
        })
      
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

  // 上传食物订单
  async subFoodOrder(ctx, next) {
    let data = ctx.request.body
    
    try {
      await FoodOrders.create({ 
        ...data, status: 0
      })
      // socket.broadcast.emit('new_user', {});
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

  // 获取账号的食物订单
  async getFoodOrder(ctx, next) {
    const { userId, status } = ctx.query

    try {
      let data
      status == -1
        ? data = await FoodOrders.findAll({ 
          where: { userId },
          order: [['updatedAt', 'DESC']]
        })
        : data = await FoodOrders.findAll({ 
          where: { userId, status },
          order: [['updatedAt', 'DESC']]
        })

      ctx.status = 200
      ctx.body = {
        data,
        message: '全部食品订单已获取',
        code: 1,
        success: true
      }
    } catch (err) {
      ctx.status = 200
      ctx.body = {
        message: '食品订单未能获取',
        code: -1,
        success: false
      }
      ctx.throw(err)
    }
  }

  async getAllOrder(ctx, next) {
    const { shopId, status } = ctx.query

    try {
      let data1, data2
      if (status == -1) {
        data1 = await FoodOrders.findAll({
          where: { shopId },
          order: [['updatedAt', 'DESC']]
        })
        data2 = await HotelOrders.findAll({
          where: { shopId },
          order: [['updatedAt', 'DESC']]
        })
      } else {
        data1 = await FoodOrders.findAll({
          where: { shopId, status },
          order: [['updatedAt', 'DESC']]
        })
        data2 = await HotelOrders.findAll({
          where: { shopId, status },
          order: [['updatedAt', 'DESC']]
        })
      }
      
      ctx.status = 200
      ctx.body = {
        data: [...data1, ...data2],
        message: '当前店铺全部订单已获取',
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