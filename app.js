const Koa = require('koa')
// const Io = require('koa-socket')

const bodyParser = require('koa-bodyparser')
const jwt = require('koa-jwt')
const logger = require('koa-logger')

const errorHandle = require('./middlewares/errorHandle')

const app = new Koa()

// 错误拦截
app.use(errorHandle())
app.use(bodyParser())
app.use(logger())
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
require('./routes')(app);

// app.use(jwt({ 
//   // 用于加密的key
//   secret: 'longjiale' 
// }).unless({ 
//   // 设置哪些api不需要token验证
//   path: [/^\/users\/login/, /^\/users\/register/] 
// }));
app.use(async (ctx, next) => {
  ctx.body = ctx.request.body;
  await next()
});

// io.attach(app)

// app.io.on('connection', async (ctx) => {
//   console.log(`  <<<< connection ${ctx.socket.id} ${ctx.socket.request.connection.remoteAddress}`);
//   console.log(ctx.socket);

//   ctx.socket.broadcast.emit('login', ctx.socket.id);
//   // 存入数据库
//   // await Socket.create({
//   //   id: ctx.socket.id,
//   //   ip: ctx.socket.request.connection.remoteAddress,
//   // })
// })

// app.io.on('login', async (ctx) => {
//   // const { socketId } = info
//   console.log(ctx);
  
//   // 存入数据库
//   // await Socket.create({
//   //   id: ctx.socket.id,
//   //   ip: ctx.socket.request.connection.remoteAddress,
//   // })
// })
// app.io.on('disconnect', async (ctx) => {
//   console.log(`  >>>> disconnect ${ctx.socket.id}`);
//   // 删除数据库
//   // await Socket.remove({
//   //   id: ctx.socket.id,
//   // })
// })


let port = 3001;
app.listen(port, () => console.log(`Server start at ${port}...`));