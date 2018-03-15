const model = require('../../db/model');
// 用于创建jwt
const jwt = require('jsonwebtoken')
const { ShopsInfos, UsersInfos } = model;

class shopController {
  async subInfos(ctx, next){
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

  async subHostels(ctx, next){
    // 关于equip [独卫, 宽带, wifi]
    let { name, intro, breakfast, price, cancel, cancelDate, equipments, left, shopId } = ctx.request.body;
    let equip = ''
    if(equipments){
      equipments.forEach(item => {
        if (item) {
          equip = equip + 1
        } else {
          equip = equip + 0
        }
      })    
    }
    
    try {
      let shop = await ShopsInfos.findOne({ where: { id: shopId } })
      shop.createShop({
        name, intro, breakfast, price, cancel, cancelDate, equipments: equip, left
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

  async getHotels(ctx, next){
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
}

// export default new shopController()
module.exports = new shopController();