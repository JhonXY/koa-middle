const db = require('../db');

// 数据自身的id默认生成
module.exports = db.defineModel('shophotelitem', {
  shop_id: db.STRING, // 床位所属商店id
  shop_id: {
    type: db.STRING,
    references: {
      model: 'shopsinfo',
      key: 'id'
    },
    comment: '所属店铺Id'
  }, // 床位所属商店id
  name: db.STRING, // 床位名
  intro: db.STRING, // 床位简介
  breakfast: db.INTEGER, // 早餐数
  price: db.FLOAT, // 床位价格
  cancel: db.STRING, // 床位可取消信息
  cancelDate: db.STRING, // 床位可取消时间
  equipments: db.STRING, // 设备json表
  left: db.INTEGER // 床位可供销售量
})