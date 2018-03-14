const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const jwt = require('koa-jwt');
const errorHandle = require('./middlewares/errorHandle')
const app = new Koa();

// 401错误处理
// app.use(errorHandle)
app.use(bodyParser());
require('./routes')(app);

app.use(jwt({ 
  // 用于加密的key
  secret: 'longjiale' 
}).unless({ 
  // 设置哪些api不需要token验证
  path: [/^\/users\/login/, /^\/users\/register/] 
}));

app.use(async (ctx, next) => {
  ctx.body = ctx.request.body;
  await next()
});



let port = 3001;
app.listen(port, () => console.log(`Koa start at ${port}...`));