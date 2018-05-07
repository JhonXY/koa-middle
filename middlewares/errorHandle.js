// module.exports = (ctx, next) => {
//   return next().catch((err) => {
//     if (err.status === 401) {
//       ctx.status = 401;
//       ctx.body = {
//         error: err.originalError ? err.originalError.message : err.message,
//       };
//     } else {
//       throw err;
//     }
//   });
// }

const assert = require('assert')

module.exports = function () {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      if(err instanceof assert.AssertionError) {
        ctx.res = err .message; return
      }
      ctx.res = `Server Error: ${err.message}`
      console.error('Unhandled Error\n', err);
    }
  }
}