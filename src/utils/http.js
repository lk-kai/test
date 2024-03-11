import axios from 'axios'
var instance = axios.create({
  timeout: 1000,
  baseURL: process.env.VUE_APP_SERVER_URL
})
// axios的全局配置
instance.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded; charset=UTF-8'
instance.defaults.headers.common[
  'X-Session-Token'
] = window.localStorage.getItem('token')

// 添加请求拦截器(post只能接受字符串类型数据)
instance.interceptors.request.use(
  function(config) {
    // console.log('发送请求')
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  // 响应包含以下信息data,status,statusText,headers,config
  (res) => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
  (err) => {
    console.log(err)
    const { response } = err
    // console.log(response)
    if (response) {
      errorHandle(response.status, response.data)
      return Promise.reject(response)
    } else {
      console.log('请求失败')
    }
  }
)
const errorHandle = (status, other) => {
  switch (status) {
    case 400:
      console.log('信息校验失败')
      break
    case 401:
      // localStorage.removeItem('token')
      console.log('认证失败')
      break
    case 403:
      console.log('token校验失败')
      break
    case 404:
      console.log('请求的资源不存在')
      break
    default:
      console.log(other)
      break
  }
}
export default instance
