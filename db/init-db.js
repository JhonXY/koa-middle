const models = require('./model.js');

// 调用的是db中暴露的exp的sync方法
// 同步所有model到数据库
// 方便批量修改model的同步
// 但存在一个同步顺序问题，使得无法设置外键，弃用

const {
  ShopHotelItems,
  ShopsInfos
} = models

// 模型间的关系
// ShopsInfos.hasMany(ShopHotelItems)
ShopHotelItems.belongsTo(ShopsInfos, {
  foreignKey: 'shop_id',
})

models.sync();
// 使用每个model单独的sync, 控制model的生成顺序
// models.ShopsInfos.sync();
// models.UsersInfos.sync();
// models.ShopHotelItems.sync();
// models.ShopFoodCategorys.sync();
// models.ShopFoodItems.sync();

console.log('init db ok.');

// process.exit(0);