const model = require('../../db/model');
// 用于创建jwt
const jwt = require('jsonwebtoken')
const { ShopsInfos, UsersInfos, ShopFoodCategorys, ShopFoodItems  } = model;

class shopController {
  // 上传店铺信息
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

  // 上传床位信息
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
      await shop.createShop({
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

  // 获取床位信息
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

  // 获取店铺列表
  async getShopsList(ctx, next){
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

  // 上传食品信息
  async subFoodItem(ctx, next){
    try {
      let { shopId, name, price, introduction, tags, imgdata, unit, category } = ctx.request.body
      
      let tips = tags.reduce((pre, cur, i) => {
        return i === 0 
                ? `${cur.toString()}`
                :`${pre.toString()} ${cur.toString()}`
      }, '')

      // 查找是否有该分类
      let hasCate = await ShopFoodCategorys.findOne({
        where: {name: category}
      })
     
      // 获取当前店铺
      let shop = await ShopsInfos.findOne({ where: { id: shopId } })

      // 通过该关系注入的方法来创建新数据
      if (hasCate !== null) {
        // 已有的分类
        await hasCate.createProduct({
          name, price, introduction, tips, imgdata, unit, category, shopId
        })
      } else {
        // 新的分类
        let newMenu = await shop.createMenu({
          name: category
        })
        newMenu.createProduct({
          name, price, introduction, tips, imgdata, unit, category, shopId
        })
      }
      

      ctx.status = 200
      ctx.body = {
        message: '菜品信息已提交',
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

  // 获取当前商店所有食品信息
  async getFoodItems(ctx, next){
    try {
      let { shopId } = ctx.query;
      let data = await ShopFoodItems.findAll({
        where: { shopId: shopId }
      })   
      ctx.status = 200
      ctx.body = {
        message: '所有菜单信息已提取',
        data,
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

  // 删除当前食品
  async delFoodItem(ctx, next) {
    try {
      let { id } = ctx.query;
      let action = await ShopFoodItems.destroy({ where: { id } });

      ctx.status = 200
      ctx.body = {
        message: '食品信息已删除',
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