const model = require('../../db/model');
// 用于创建jwt
const jwt = require('jsonwebtoken')
const { ShopsInfos, UsersInfos } = model;

class orderController {
  async subHotelOrder(ctx, next) {
    // post的传值通过bodyParser提供的ctx.request.body获取
    let { longitude, latitude, tele, area, details, name, MasterId } = ctx.request.body;
    try {
      // 因为外键的原因，需要先找到外键的主人
      let user = await UsersInfos.findOne({ where: { id: MasterId } })
      // 通过该关系注入的方法来创建新数据
      user.createMaster({
        longitude, latitude, tele, area, details, name, rate: 5
      })
      ctx.status = 200
      ctx.body = {
        message: '店铺信息已提交',
        code: 1,
        success: true
      }
    } catch (err) {
      ctx.status = 200
      ctx.body = {
        message: 'fail',
        code: -1,
        success: false
      }
      ctx.throw(err)
    }
  }

  async getHotels(ctx, next) {
    let { shopId } = ctx.query;
    try {
      let shop = await ShopsInfos.findOne({ where: { id: shopId } })
      let data = await shop.getShop()

      ctx.status = 200
      ctx.body = {
        message: '店铺床位已提取',
        data: {
          data
        },
        code: 1,
        success: true
      }
    } catch (err) {
      ctx.status = 200
      ctx.body = {
        message: 'fail',
        code: -1,
        success: false
      }
      ctx.throw(err)
    }
  }

  async getShopsList(ctx, next) {
    try {
      let data = await ShopsInfos.findAll()

      ctx.status = 200
      ctx.body = {
        message: '所有店铺信息已提取',
        data: {
          data
        },
        code: 1,
        success: true
      }
    } catch (err) {
      ctx.status = 200
      ctx.body = {
        message: 'fail',
        code: -1,
        success: false
      }
      ctx.throw(err)
    }
  }
}

// export default new shopController()
module.exports = new orderController();