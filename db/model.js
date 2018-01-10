/* 该文件是整个数据库操作的整合和提供外部使用的接口*/
const fs = require('fs');
const db = require('./db')

// 获取文件夹内的所有文件名
let files = fs.readdirSync(__dirname + '/models');

// 提取js文件
let js_files = files.filter((f) => {
  return f.endsWith('.js')
}, files);

let models = {}
/*将各个model绑定到该文件的输出上方便调用
  model的调用对应文件名，直接引用model文件就可以使用所有的model了
 如:
 const model = require('./model');
 let { Pet } = model; */
// 这里需要注意下，对module.exports的赋值必须立即进行
// 不可放入任何回调中
for(let f of js_files){
  let name = f.substring(0, f.length -3);
  console.log('库表：' + name);
  // 将各个model绑定到这个文件输出的module.exports上
  models[name] = require(__dirname + '/models/' + f)
}

// 这里的sync是Sequelize提供的一个方法
// 同步当前实例中定义的所有模型
models.sync = () => {
  db.sync();
}

module.exports = models;