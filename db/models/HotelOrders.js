const db = require('../db');

// 数据自身的id默认生成
const hotelorder = db.defineModel('hotelorder', {
  status: db.INTEGER, // 订单状态 0 待付 1 已付 2 已完成 3 已退款
  checkIn: db.STRING, // 住店时间
  checkOut: db.STRING, // 出店时间
  howLong: db.INTEGER, // 几天
  shopName: db.STRING, // 店铺名
  roomNum: db.INTEGER, // 房间数
  checkMan: db.STRING, // 订单提交人
  userId: db.STRING, // 使用人id
  phone: db.STRING, // 联系电话
  shopId: db.STRING, // 店铺id
  hotelId: db.STRING, // 床位id
  amount: db.DOUBLE // 订单价格
})
// shophotelitem.sync({ force: true })

module.exports = hotelorder