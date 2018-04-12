const db = require('../db');

// 数据自身的id默认生成
const hotelorder = db.defineModel('hotelorder', {
  status: db.INTEGER, // 订单状态 0 待付 1 已付 2 已完成 3 已退款
  shopName: db.STRING, // 店铺名
  checkMan: db.STRING, // 订单提交人
  userId: db.STRING, // 用户id
  phone: db.STRING, // 联系电话
  shopId: db.STRING, // 店铺id
  hotelId: db.STRING, // 床位id
  amount: db.DOUBLE // 订单价格
})
// shophotelitem.sync({ force: true })

// module.exports = hotelorder