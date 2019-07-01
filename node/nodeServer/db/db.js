const mongoose = require('mongoose')

const OB_URL = 'mongodb://localhost:27017/local'

mongoose.connect(OB_URL)

mongoose.connection.on('connected', () => {
  console.log('Mongoose connection open to:' + OB_URL)
})

/**
 * 连接异常 error 数据库连接错误
 */
mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error:' + err)
})

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected')
})

module.exports = mongoose