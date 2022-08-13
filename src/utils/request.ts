import axios from 'axios'
import { ElMessage } from 'element-plus'

const $http = axios.create({
  baseURL: 'http://loachost:3000/',
  timeout: 5000,
  headers: {
    'Content-type': 'application/json;charset=utf-8',
  },
})

//请求拦截，验证token
$http.interceptors.request.use(
  config => {
    config.headers = config.headers || {}
    if (localStorage.getItem('token')) {
      config.headers.token = localStorage.getItem('token') || ''
    }
  },
  error => {
    return Promise.reject(error)
  }
)

//响应拦截，验证响应码，是否请求成功
$http.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status && res.status !== 200) {
      ElMessage(res.message)
      return Promise.reject(res || 'Error')
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default $http
