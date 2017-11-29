const db = require('../db');

module.exports = db.defineModel('shopsinfo', {
  name: db.STRING, // 店铺名
  details: db.STRING, // 店铺详细地址
  area: db.STRING, // 店铺所在区域
  longitude: db.DECIMAL, // 店铺经度
  latitude: db.DECIMAL, // 店铺纬度
  tele: db.BIGINT, // 店铺电话
  rate: db.INTEGER // 店铺评分
})