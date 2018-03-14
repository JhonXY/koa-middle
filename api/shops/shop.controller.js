const model = require('../../db/model');
// 用于创建jwt
const jwt = require('jsonwebtoken')
const { ShopsInfos, UsersInfos } = model;

class shopController {
  async subInfos(ctx, next){
  // post的传值通过bodyParser提供的ctx.request.body获取
    console.log(ctx.request.body);
  
    let { longitude, latitude, tele, area, details, name, MasterId } = ctx.request.body;
    try {
      // 因为外键的原因，需要先找到外键的主人
      let user = await UsersInfos.findOne({ where: { id: MasterId } })
      // user.getMaster({
      //   longitude, latitude, tele, area, details, name, rate: 5
      // })
      // user.setMaster({
      //   longitude, latitude, tele, area, details, name, rate: 5
      // })
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
}

// export default new shopController()
module.exports = new shopController();