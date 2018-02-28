const db = require('../db');

const shopfooditem = db.defineModel('shopfooditem', {
  shop_id: db.STRING, // 食物所属商店id
  category_id: db.STRING, // 食物分类id
  category: db.STRING, // 食物分类名
  name: db.STRING, // 食物名
  price: db.FLOAT, // 食物价格
  intro: db.STRING, // 食物简介
  imgsrc: db.STRING // 食物图片url
})

// shopfooditem.sync({ force: true })

module.exports = shopfooditem