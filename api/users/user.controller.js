const model = require('../../db/model');
// 用于创建jwt
const jwt = require('jsonwebtoken')
let { UsersInfos } = model;

exports.register = async (ctx, next) => {
  // post的传值通过bodyParser提供的ctx.request.body获取
  const { nickname, sex, phone, password }= ctx.request.body;
  const { role } = ctx.request.body;
  try {
    role? await UsersInfos.create({ // 店家
            nickname, sex, phone, password, role: 1
          })
        : await UsersInfos.create({ // 普通用户
            nickname, sex, phone, password, role: 0
          })
    let userToken = {
      name: nickname
    }
    const token = jwt.sign(userToken, 'lonjiale', {expiresIn: '3h'}) // 签发token
    ctx.status = 200
    ctx.body = {
      message: 'register success',
      bean: { token },
      code: 1
    }
  } catch (err) {
    ctx.status = 200
    ctx.body = {
      message: 'fail',
      code: -1
    }
    ctx.throw(err)
  }
}

exports.login = async (ctx, next) => {
  // url参数从上下文中的query里直接获取
  const { userphone, password } = ctx.query
  try {
    let user = await UsersInfos.findOne({ where: { phone: userphone, password }})
    let userToken = {
      name: user.nickname
    }
    const token = jwt.sign(userToken, 'lonjiale', { expiresIn: '3h' }) // 签发token
    ctx.status = 200
    ctx.body = {
      message: 'success',
      bean: { token },
      code: 1
    }
  } catch (err) {
    ctx.status = 200
    ctx.body = {
      message: 'fail',
      code: -1
    }
    ctx.throw(err)
  }
}