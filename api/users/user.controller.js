const model = require('../../db/model');
let { UsersInfos } = model;

exports.addUser = async (ctx, next) => {
  const content = ctx.request.body
  console.log('====================================');
  console.log(ctx.request.body);
  console.log('====================================');
  try {
    await UsersInfos.create(content)
    ctx.status = 200
    ctx.body = {
      success: true, 
    }
  } catch (err) {
    ctx.throw(err)
  }
}

exports.getUser = async (ctx, next) => {
  try {
    let user = await UsersInfos.findOne(
      {
        where: {
          nickname: '123'
        }
      }
    )
    ctx.status = 200
    // ctx.body = { data: user }
    ctx.body = {
      data: user
    }
  } catch (err) {
    ctx.throw(err)
  }
}