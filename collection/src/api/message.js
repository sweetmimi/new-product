import axiosInstance from '@/interceptors/axios'
import { messageApi } from '@/constants/api'

export const getMsgList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: messageApi.getMsgList,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const sendMsg = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: messageApi.sendMsg,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const getMsgContent = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: messageApi.getMsgContent,
    data: data
  }).then((res) => {
    callback(res)
  })
}
