const db = require('../db');

const shopfoodcategory = db.defineModel('shopfoodcategory', {
  name: db.STRING, // 分类名
})

module.exports = shopfoodcategory