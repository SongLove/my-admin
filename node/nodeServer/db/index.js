const mongoose = require('./db')
let ObjectId = require('mongodb').ObjectId
const Schema = mongoose.Schema

const ceshiSchema = new Schema({
  name: String,
  sex: String,
  age: String
})
const usersSchema = new Schema({
  user_name: String,
  pass_word: String
})

const articleSchema = new Schema({
  user_name: String,
  artic_title: String,
  artic_type: String,
  abstract: String,
  release_time: String,
  artic_content: String,
  type_label: Array
})

const materialScheme = new Schema({
  material_name: String,
  material_tyle: String,
  material_url: String,
  add_timer: String
})

const ModelList = {
  ceshi: mongoose.model('ceshi', ceshiSchema),
  article: mongoose.model('article', articleSchema),
  user: mongoose.model('user', usersSchema),
  material: mongoose.model('material', materialScheme),
}


class Mongodb {
  constructor(name) {
    console.log(name, 'serverName')
    this.name = name
  }
  // 查询
  query(queryData) {
    return new Promise((resolve, reject) => {
      ModelList[this.name].find(queryData, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
  // 保存
  save(obj) {
    const m = new ModelList[this.name](obj)
    return new Promise((resolve, reject) => {
      m.save((err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
  // 更新
  updateOne(obj) {
    console.log('id', obj._id)
    let whereStr = { _id: ObjectId(obj._id) }
    let updateStr = { $set: obj }
    return new Promise((resolve, reject) => {
      ModelList[this.name].updateOne(whereStr, updateStr, (err, res) => {
        if (err) {
          reject(res)
        }
        resolve(res)
      })
    })
  }
  // 删除
  remove(obj) {
    let removeStr = obj
    return new Promise((resolve, reject) => {
      ModelList[this.name].deleteOne(removeStr, (err, res) => {
        if (err) {
          reject(res)
        }
        resolve(res)
      })
    })
  }
}

module.exports = Mongodb