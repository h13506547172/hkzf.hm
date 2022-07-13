// 引入axios
import axios from 'axios'
// 引入Vuex
import store from '@/store/index'
// 创建axios实例并设置根地址，因为实际开发中可能不止一个根地址
const request = axios.create({
  baseURL: 'http://liufusong.top:8080'
})
// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前如果user.token存在就添加请求头
    const { userToken } = store.state
    if (userToken && userToken.token) {
      config.headers.Authorization = store.state.userToken.token
    }
    // config是本次请求的请求配置对象,一定要返回
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
export default request
