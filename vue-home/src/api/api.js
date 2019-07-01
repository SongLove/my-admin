import axios from 'axios'
import config from '../config'

// 在config.js文件中统一存放一些公共常量，方便之后维护

// 添加请求拦截器，在发送请求之前做些什么(**具体查看axios文档**)--------------------------------------------
axios.interceptors.request.use(function (config) {
  // 显示loading
  return config
}, function (error) {
  // 请求错误时弹框提示，或做些其他事
  return Promise.reject(error)
})

// 添加响应拦截器(**具体查看axios文档**)----------------------------------------------------------------
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么，允许在数据返回客户端前，修改响应的数据
  // 如果只需要返回体中数据，则如下，如果需要全部，则 return response 即可
  return response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})// 封装数据返回失败提示函数---------------------------------------------------------------------------
function errorState(response) {
  // 隐藏loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.data.status === 200 || response.status === 304 || response.status === 400)) {
    // 如果不需要除了data之外的数据，可以直接 return response.data
    return response
  } else {
    alert('数据获取错误')
  }
}

// 封装数据返回成功提示函数---------------------------------------------------------------------------
// function successState(res) {
//   // 隐藏loading
//   // 统一判断后端返回的错误码(错误码与后台协商而定)
//   if (res.data.status === 200) {
//     return res
//   }
// }

// 封装axios--------------------------------------------------------------------------------------
function apiAxios(method, url, params) {
  console.log('数据', params)
  let httpDefault = {
    method: method,
    baseURL: config.baseURL,
    url: url,
    // `params` 是即将与请求一起发送的 URL 参数
    // `data` 是作为请求主体被发送的数据
    params: method === 'GET' || method === 'DELETE' ? params : null,
    data: method === 'POST' || method === 'PUT' ? params : null,
    timeout: 10000,
    // 请求头信息
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    // 返回数据类型
    responseType: 'json'
  }

  // 注意**Promise**使用(Promise首字母大写)
  return new Promise((resolve, reject) => {
    axios(httpDefault)
      // 此处的.then属于axios
      .then((res) => {
        //successState(res)
        let { data, status, msg } = res
        resolve({ data, status, msg })
      }).catch((response) => {
        // errorState(response)
        reject(errorState(response))
      })
  })
}

// Vue.js的插件应当有一个公开方法 install。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
export default {
  install: function (Vue) {
    // 获取列表 可传入筛选参数
    Vue.prototype.sendArticleList = (params) => apiAxios('POST', '/get_article_List', params)
  }
}