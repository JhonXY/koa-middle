const model = require('../../db/model');
// 用于创建jwt
const jwt = require('jsonwebtoken')
const { UsersInfos } = model;
// 使用bcrypt加密技术

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

    ctx.status = 200
    ctx.body = {
      message: 'register success',
      code: 1,
      success: true
    }
  } catch (err) {
    ctx.status = 200
    ctx.body = {
      message: 'fail',
      code: -1,
      success: false
    }
    ctx.throw(err)
  }
}

exports.login = async (ctx, next) => {
  // get方式
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
      userInfo: {
        user
      },
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