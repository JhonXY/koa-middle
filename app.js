const Koa = require('koa');
const app = new Koa();

// 获取到数据库操作相关
const model = require('./db/model');

let { UsersInfos } = model;

app.use(async (ctx, next) => {
  ctx.body = `啦啦啦`;
  await next()
});

require('./routes')(app)

let port = 3000;
app.listen(port, () => console.log(`Koa start at ${port}...`));