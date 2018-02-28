const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const jwt = require('koa-jwt');

const app = new Koa();

app.use(bodyParser());
require('./routes')(app);

app.use(jwt({ secret: 'longjiale' }).unless({ path: [/^\/users\/login/, /^\/users\/register/] }));

app.use(async (ctx, next) => {
  ctx.body = ctx.request.body;
  await next()
});



let port = 3001;
app.listen(port, () => console.log(`Koa start at ${port}...`));