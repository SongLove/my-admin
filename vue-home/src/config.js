// axios 配置

let baseURL
// 环境的切换
if (process.env.NODE_ENV == 'development') {
  baseURL = 'http://127.0.0.1:3100'
}
else if (process.env.NODE_ENV == 'debug') {
  baseURL = 'https://easy-mock.com/mock/5ad75e9f41d4d65f0e935be4/example'
}
else if (process.env.NODE_ENV == 'production') {
  baseURL = 'https://www.production.com';
}



export default {
  baseURL
}