const Router = require('koa-router')();

const users = require('./api/users');
const shops = require('./api/shops');
const orders = require('./api/orders');

module.exports = (app) => {
  // 路由前缀
  Router
    .use('/users', users.routes(), users.allowedMethods())
    .use('/shops', shops.routes(), shops.allowedMethods())
    .use('/orders', orders.routes(), orders.allowedMethods())

  app.use(Router.routes())
}