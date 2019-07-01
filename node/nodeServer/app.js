const Koa = require('koa')
const config = require('./config')
const ModelDb = require('./db')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')// 处理post请求，把 koa2 上下文的表单数据解析到
const formidable = require("formidable")
const OSS = require('ali-oss')
const co = require('co')
const multiparty = require('multiparty')
const fs = require('fs')

// oss 配置
const client = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAITDtkCFvi5Ln6', //自定义项
  accessKeySecret: 'U5dkkcDaJ6NiF56bpo18kpsfxV7ajh' //自定义项
})

const app = new Koa()
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  console.log(`${ctx.method}`, `${ctx.url}`);
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
});

router.get('/', async (ctx, nxt) => {
  let data = await new ModelDb('ceshi').query()
  ctx.body = data
})
router.get('/ceshi', async (ctx, nxt) => {
  ctx.body = `<form action="http://127.0.0.1:3100/addArticle" method="POST">
    <input type="text" name="name" /> <br />
    <input type="text" name="age" /> <br />
    <input type="radio" name="sex" value="男" /> 男
    <input type="radio" name="sex" value="女" /> 女
    <br />
    <input type="submit" />
  </form>`
})

router.post('/login', async (ctx, next) => {
  let model = new ModelDb('user')
  await model.query(ctx.request.body).then(res => {
    if (res) {
      ctx.body = {
        status: 0,
        msg: '没有此用户'
      }
      return
    } else {
      ctx.body = {
        status: 200,
        data: res,
        msg: '登录成功'
      }
      next()
    }
  })
})

// 获取图片素材
router.post('/get_material', async (ctx, next) => {
  let model = new ModelDb('material')
  await model.query(ctx.request.body).then((res) => {
    ctx.type = 'json'
    ctx.body = {
      status: 200,
      data: res
    }
  })
  next()
})

// 上传图片
router.post('/upfile', async (ctx, next) => {
  // ctx.body = {
  //   code: '0',
  //   descriptionpm2: 'ok',
  //   result: ctx
  // }
  let alioss_upfile = () => {
    return new Promise((resolve, reject) => {
      // 上传多文件 使用multiparty
      let form = new multiparty.Form({
        encoding: 'utf-8',
        keepExtensions: true // 保留后缀
      })
      form.parse(ctx.req, async function (err, fields, files) {
        let data = []
        let model = new ModelDb('material')
        console.log('数据', files)
        ctx.req.body = ctx.req
        for (let f of files.file) {
          let date = new Date()
          let time = '' + date.getFullYear() + (date.getMonth() + 1) + date.getDate()
          let filepath = 'slideshow/' + time + '/' + date.getTime()
          // 文件后缀
          let [fileext, fileName] = [f.originalFilename.split('.').pop(), f.originalFilename.split('.').shift()]
          let upfile = f.path
          let newfile = filepath + '.' + fileext
          let resultsRrl = ''
          client.useBucket('tanggeek')
          await client.put(newfile, upfile).then((results) => {
            console.log('文件上传成功!', results.url)
            resultsRrl = results.url
            data.push(results.url)
          }).catch((err) => {
            console.log(err)
          })
          let obj = {
            material_name: fileName,
            material_tyle: fileext,
            material_url: resultsRrl,
            add_timer: new Date().getTime()
          }
          await model.save(obj)
        }
        ctx.type = 'json'
        ctx.body = {
          status: 200,
          data: data
        }
        resolve(next())
      })
    })
  }
  await alioss_upfile()
})

// 添加文章
router.post('/add_article', async (ctx, next) => {
  let model = new ModelDb('article')
  let data;
  console.log('添加文章', ctx.request.body.menu_type)
  if (ctx.request.body.menu_type === 'add') {
    await model.save(ctx.request.body).then((res) => {
      console.log('成功', res)
      data = res
    })
  } else {
    await model.updateOne(ctx.request.body).then((res) => {
      data = res
    })
  }
  ctx.type = 'json'
  ctx.body = {
    status: 200,
    data: data
  }
  next()
})

// 删除文章
router.post('/delete_article', async (ctx, next) => {
  let model = new ModelDb('article')
  await model.remove(ctx.request.body).then(res => {
    ctx.body = {
      status: 200,
      msg: '成功删除'
    }
  })
})

// 获取文章列表
router.post('/get_article_List', async (ctx, next) => {
  let model = new ModelDb('article')
  await model.query(ctx.request.body).then(res => {
    ctx.body = {
      status: 200,
      data: {
        list: res,
        total: res.length
      }
    }
  })
  next()
})

// 

// app.use(async (ctx) => {
//   let data = await ModelDb.query()
//   ctx.body = data
// })
app.use(bodyParser())
app.use(router.routes())

app.listen(config.port)