const Router = require('koa-router')();

const users = require('./api/users');
const shops = require('./api/shops');

module.exports = (app) => {
  // 路由前缀
  Router
    .use('/users', users.routes(), users.allowedMethods())
    .use('/shops', shops.routes(), shops.allowedMethods())

  app.use(Router.routes())
}