import axiosInstance from '@/interceptors/axios'
import { orderApi } from '@/constants/api'

export const getOrderList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: orderApi.orderList,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const getChangeFollowUser = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: orderApi.getChangeFollowUser,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const changeFollowUser = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: orderApi.changeFollowUser,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const getHistoryList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: orderApi.getHistoryList,
    data: data
  }).then(res => {
    callback(res)
  })
}

export const getMyHistoryList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: orderApi.getMyHistoryList,
    data: data
  }).then(res => {
    callback(res)
  })
}

export const getBatchChangeFollowUser = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: orderApi.getBatchChangeFollowUser,
    data: data
  }).then(res => {
    callback(res)
  })
}

export const batchChangeFollowUser = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: orderApi.batchChangeFollowUser,
    data: data
  }).then(res => {
    callback(res)
  })
}

export const getcomment = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: orderApi.getcomment,
    data: data
  })
    .then(res => {
      callback(res)
    })
}


export const getRecoveryRate = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: orderApi.getRecoveryRate,
    data: data
  })
    .then(res => {
      callback(res)
    })
}

export const getProductId = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: orderApi.getProductId,
    data: data
  })
    .then(res => {
      callback(res)
    })
}
// getGroupList
export const getGroupList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: orderApi.getGroupList,
    data: data
  })
    .then(res => {
      callback(res)
    })
}

