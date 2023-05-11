import axios from 'axios'
import { Modal } from 'iview'
import Qs from 'qs'
import {
  Decrypt,
  Encrypt
} from "./crypt";
let axiosInstance = {}
axiosInstance = axios.create({
  baseURL: '/test',
  timeout: 20000,
  maxContentLength: 2000,
  headers: {}
})

axiosInstance.interceptors.request.use((config) => {

  if (config.data) {
    Object.assign(config.data, {
      lang: window.lang
    })
  } else {
    config.data = Object.assign({}, {
      lang: window.lang
    })
  }

  process.env.NODE_ENV === 'production' ? "" : console.log("mi", config.data)
  var requestData = Encrypt(JSON.stringify(config.data))
  if (config.method.toLowerCase() === 'get') {
    config.headers.params = requestData;
    config.headers.encrypt = 2;
    // config.params = config.data
  }else{
    config.data = {
      data: requestData,
      encrypt: 2
    }
  }
  config.data = Qs.stringify(config.data)
  let requestConfig = Object.assign({
    responseType: 'text'
  }, config)
  return requestConfig
}, (error) => {
  Modal.error({
    content: error.msg
  })
  return Promise.reject(error.message)
})

axiosInstance.interceptors.response.use((response) => {
  var redata = ""
  var data = null
  if (response.data) {
    if (Object.prototype.toString.call(response.data) === '[object Object]') {
      data = response.data
    } else {
      redata = Decrypt(response.data)
      data = JSON.parse(redata)
    }
  } else {
    console.log("qian", response)
    data = []
  }
  process.env.NODE_ENV === 'production' ? "" : console.log("jie", data)
  if (data.status === 10010) {
    localStorage.removeItem('u.info')
    window.location.href = '/login'
    return
  }
  if (data.status !== 0 && data.status !== 99) {
    Modal.error({
      content: data.msg || 'error'
    })
  }
  return data
}, (error) => {
  Modal.error({
    content: error.msg || 'timeout'
  })
  return Promise.reject(error)
})

export default axiosInstance
