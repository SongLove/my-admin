import axios from 'axios';
import qs from 'qs'

import config from './config'

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
function successState(res) {
  // 隐藏loading
  // 统一判断后端返回的错误码(错误码与后台协商而定)
  if (res.data.status === 200) {
    return res
  }
}

// 封装axios--------------------------------------------------------------------------------------
function apiAxios(method, url, params) {
  console.log('数据', params)
  let httpDefault = {
    method: method,
    baseURL: config.serverUrl,
    url: url,
    // `params` 是即将与请求一起发送的 URL 参数
    // `data` 是作为请求主体被发送的数据
    params: method === 'GET' || method === 'DELETE' ? params : null,
    data: method === 'POST' || method === 'PUT' ? params : null,
    timeout: 10000
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
        reject(response)
      })
  })
}


// export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };


// export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

// export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

// export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

// export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

// 上传图片
// export const upFileApi = params => {
//   return apiAxios('POST', `${serverUrl}/upfile`, params)
//   return axios.post(`${serverUrl}/upfile`, params).then(res => res.data);
// };

// 添加文章
// export const addArticleApi = params => {
//   return apiAxios('POST', `${serverUrl}/addarticle`, params)
// };

// 查询文章内容
// export const sendArticleList = params => {
//   return apiAxios('POST', `${serverUrl}/articleList`, params)
// };
// 输出函数getAxios、postAxios、putAxios、delectAxios，供其他文件调用-----------------------------
// Vue.js的插件应当有一个公开方法 install。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
export default {
  install: function (Vue) {
    // 获取列表 可传入筛选参数
    Vue.prototype.sendArticleList = (params) => apiAxios('POST', `/get_article_List`, params)
    // 添加文章
    Vue.prototype.addArticleApi = (params) => apiAxios('POST', `/add_article`, params)
    // 上传图片
    Vue.prototype.upFileApi = (params) => apiAxios('POST', `/upfile`, params)
    // 
    Vue.prototype.queryArticleItem = (params) => apiAxios('POST', `/get_article_item`, params)
    // 删除文章
    Vue.prototype.deleteArticle = (params) => apiAxios('POST', `/delete_article`, params)
    // 登陆
    Vue.prototype.requestLogin = (params) => apiAxios('POST', `/login`, params)
    Vue.prototype.getMaterial = (params) => apiAxios('POST', `/get_material`, params)
  }
}