const Sequelize = require('sequelize');
// 用于生成唯一标识id
const uuid = require('node-uuid');

console.log('init sequelize');

function generateId() {
  return uuid.v4();
}

// 数据库地址的相关配置
const config = require('./config');
// 实例初始化sequlize
const sequelize = new Sequelize(
  config.database, 
  config.username, 
  config.password, 
  {
    host: config.host,
    dialect: 'mysql',
    port: config.port,
    pool: {
      max: 5,
      min: 0,
      idle: 30000
    }
  }
);

// 主键一定是STRING(50)
const ID_TYPE = Sequelize.STRING;

// 重写define方法
/* @param name model名
   @param attributes 自定义的model的字段集合
*/
function defineModel(name, attributes){
  let attrs ={};
  for(let key in attributes){
    let value = attributes[key];
    // 判定是否是通过db挂载了type属性的,都挂载allowNull为false
    if(typeof value === 'object' && value['type']){
      value.allowNull = value.allowNull || false;
      attrs[key] = value;
    } else {
      attrs[key] = {
        type: value,
        allowNull: false
      }
    }
  }
  // 主键自动配置
  attrs.id = {
    type: ID_TYPE,
    primaryKey: true
  };
  attrs.createdAt = Sequelize.DATE;
  attrs.updatedAt = Sequelize.DATE;
  attrs.version = {
    type: Sequelize.BIGINT,
    allowNull: false
  };

  // 通过第三个参数提前预设以便批量定义额外的通用的定义项
  return sequelize.define(name, attrs, {
    // 统一timestamp机制
    timestamps: false,
    // 每个Model必须有createdAt、updatedAt和version，
    // 分别记录创建时间、修改时间和版本号。
    hooks: {
      beforeValidate: (obj) => {
        // obj是当前model的实例对象
        // obj.dataValues内包含着已有的字段
        let now = Date.now();
        if (obj.isNewRecord) {
          // 生成初始版本
          if (!obj.id) {
            // 生成唯一标识的id
            obj.id = generateId();
          }
          obj.createdAt = now;
          obj.updatedAt = now;
          obj.version = 0;
        } else {
          // 记录修改时间与版本
          obj.version++;
        }
      }
    }
  });
}

// 用于暴露的对象
var exp = {
  // 用于创建model
  defineModel,
  // 用于初始化数据库
  sync: () => {
    // 非生产环境允许同步数据库
    if (process.env.NODE_ENV !== 'production') { 
      console.log('同步');
       
      // sequelize.sync();
      sequelize.sync({force: true}); // 这样同步时会删除同名已有的库表
      // sequelize.sync({force: false}); 
    } else {
      throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
    }
  }
};

// 为对象绑定sequelize的数据类型
const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATE', 'BOOLEAN', 'DECIMAL', 'FLOAT'];
for (let type of TYPES) {
  exp[type] = Sequelize[type];
}

// 主键默认设置
// exp.ID = ID_TYPE;
// exp.generateId = generateId;

module.exports = exp;