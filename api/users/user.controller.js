const model = require('../../db/model');
// 用于创建jwt
const jwt = require('jsonwebtoken')
const { UsersInfos, ShopsInfos } = model;
const pingpp = require('pingpp')('sk_test_mnbzLSO0anP8v9GOm5eTu5iD');
pingpp.setPrivateKeyPath(__dirname + "/rsa.pem");
// 使用bcrypt加密技术

const sucContent ={
  message: 'success',
  code: 1
}

const errContent = {
  message: 'fail',
  code: -1
}
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

exports.hasShop = async (ctx, next) => {
  const { id } = ctx.query
  try {
    let shop = await ShopsInfos.findOne({ where: { master_id: id } })
    ctx.status = 200
    
    if(shop){
      ctx.body = {
        ...sucContent,
        hasShop: true
      }
    } else {
      ctx.body = {
        ...sucContent,
        hasShop: false
      }
    }
  } catch(err){
    ctx.status = 200
    ctx.body = {
      message: 'fail',
      code: -1
    }
    ctx.throw(err)
  }
}

exports.login = async (ctx, next) => {
  // get方式
  // url参数从上下文中的query里直接获取
  const { userphone, password } = ctx.query
  try {
    let shop, user = await UsersInfos.findOne({ where: { phone: userphone, password }})
    
    if(user.getMaster){
      // 通过user设置在shop上的master外键来获取shop的信息
      await user.getMaster().then(res => {
        if(res){
          let { area, name, details, rate, tele, id } = res.dataValues
          shop = { area, name, details, rate, tele, id }
        }
      })
    }

    // 如果是后台登录做socket
    console.log(ctx.query);
    
    if ('backend' in ctx.query) {
      // socket.on('user_login', function (info) {
      //   const { tokenId, userId, socketId } = info;
      //   addSocketId(users, { tokenId, socketId, userId });
      // });
      // to 代表往指定id的socket连接推送
      // ctx.socket.socket.to(user.id).emit('login', user.id);
      // ctx.socket.broadcast.emit('login', user.id);
    }
    // user.createMaster({
    //   longitude, latitude, tele, area, details, name, rate: 5
    // })
    let userToken = {
      name: user.nickname
    }
    const token = jwt.sign(userToken, 'lonjiale', { expiresIn: '3h' }) // 签发token
    ctx.status = 200
    ctx.body = {
      ...sucContent,
      bean: { token },
      userInfo: {
        user
      },
      shopInfo: shop || false,
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

exports.alipay = async (ctx, next) => {
  await pingpp.charges.create({
    subject: "test",
    body: 'body',
    amount: ctx.request.body.amount*100, //因为单位是分所以乘100
    order_no: new Date().getTime().toString().substr(0, 10),
    channel: "alipay",
    currency: "cny",
    client_ip: "127.0.0.1",
    app: {id: "app_zzL8W5GCmnnDuzrL"}
  }).then((charge)=> {
    ctx.status = 200
    ctx.body = {
      code: 1,
      message: "请求charge成功",
      charge
    }
  }).catch((err)=>{
    ctx.status = 200
    ctx.body = {
      message: 'fail',
      code: -1,
      err
    }
  })
}