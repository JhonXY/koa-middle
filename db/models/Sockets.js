const db = require('../db');
const models = require('../model')

const socket = db.defineModel('socket', {
  userId: db.STRING, // 用户Id
})

// socket.sync({ force: false })

module.exports = socket