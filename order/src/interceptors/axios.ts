import axios from 'axios'
import iView from 'iview'
import Qs from 'qs'
import {
  Decrypt,
  Encrypt
} from "./crypt";
const { Modal } = iView

let axiosInstance: any = {}
axiosInstance = axios.create({
  baseURL:'/test',
  timeout: 20000,
  maxContentLength: 2000,
  headers: {}
})

axiosInstance.interceptors.request.use((config: any) => {

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
    // config.params = config.data
    config.headers.params = requestData;
    config.headers.encrypt = 2;
  }else{
    config.data = {
      data: requestData,
      encrypt: 2
    }
  }
  // config.data = Qs.stringify(config.data)
  const requestConfig = Object.assign({
    responseType: 'text'
  }, config)
  return requestConfig
}, (error: any) => {
  Modal.error({
    content: error.message || 'time out'
  })

  return Promise.reject(error.message)
})

axiosInstance.interceptors.response.use((response: any) => {
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

  if (data.code === 5) {
    window.location.href = '/#/login'
    return
  }
  if (data.code !== 0) {
    Modal.error({
      content: data.msg || 'time out'
    })

  }
  return data
}, (error: any) => {
  Modal.error({
    content: error.message
  })
  return Promise.reject(error)
})
export default axiosInstance
