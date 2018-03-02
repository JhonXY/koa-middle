const db = require('../db');

// 此处的model还未sync()
// model映射库表的修改需从sync()开始
// 通过sync()返回的promise对象做相关操作
const usersinfo = db.defineModel('usersinfo', {
  nickname: db.STRING, // 用户昵称
  password: db.STRING, // 用户密码
  sex: db.BOOLEAN, // 用户性别0-女，1-男
  phone: db.STRING, // 用户手机号
  role: db.BOOLEAN, // 用户角色0-普通用户，1-店家
}, { underscored: true });

// usersinfo.sync({ force: true })

module.exports = usersinfo