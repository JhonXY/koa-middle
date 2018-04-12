const db = require('../db');

const shopfooditem = db.defineModel('shopfooditem', {
  name: db.STRING, // 食物名
  price: db.FLOAT, // 食物价格
  introduction: db.STRING, // 食物简介
  tips: db.STRING, // 食物小标
  imgdata: db.TEXT, // 图片数据
  unit: db.STRING, // 食物单位
  category: db.STRING, // 所属分类名
  shopId: db.STRING // 所属店铺id
})

// 用于单独执行该文件对库表进行更新
// shopfooditem.sync({ force: true })

module.exports = shopfooditem