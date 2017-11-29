const db = require('../db');

module.exports = db.defineModel('shopfoodcategory', {
  shop_id: db.STRING, // 分类所属商店id
  name: db.STRING, // 分类名
  intro: db.STRING // 分类简介
})