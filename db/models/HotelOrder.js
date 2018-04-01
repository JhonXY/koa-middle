const db = require('../db');

// 数据自身的id默认生成
const hotelorder = db.defineModel('hotelorder', {
  checkIn: db.STRING,
  checkOut: db.STRING,
  howLong: db.INTEGER,
  shopName: db.STRING,
  roomNum: db.INTEGER,
  checkMan: db.STRING,
  phone: db.STRING,
  shopId: db.STRING,
  hotelId: db.STRING,
})
// shophotelitem.sync({ force: true })

module.exports = hotelorder