const model = require('./model.js');

// 调用的是db中暴露的exp的sync方法
// 同步所有model到数据库
// 方便批量修改model的同步
model.sync();

console.log('init db ok.');

// process.exit(0);