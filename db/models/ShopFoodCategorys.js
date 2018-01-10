const db = require('../db');

const shopfoodcategory = db.defineModel('shopfoodcategory', {
  shop_id: db.STRING, // 分类所属商店id
  name: db.STRING, // 分类名
  intro: db.STRING // 分类简介
})

shopfoodcategory.sync({ force: true })

module.exports = shopfoodcategory