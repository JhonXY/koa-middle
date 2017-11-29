const db = require('../db');

module.exports = db.defineModel('shophotelitem', {
  shop_id: db.STRING, // 床位所属商店id
  name: db.STRING, // 床位名
  intro: db.STRING, // 床位简介
  breakfast: db.INTEGER, // 早餐数
  price: db.FLOAT, // 床位价格
  cancel: db.STRING, // 床位可取消信息
  left: db.INTEGER // 床位可供销售量
})