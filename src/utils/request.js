// 引入axios
import axios from 'axios'
// 创建axios实例并设置根地址，因为实际开发中可能不止一个根地址
const request = axios.create({
  baseURL: 'http://liufusong.top:8080'
})
export default request
