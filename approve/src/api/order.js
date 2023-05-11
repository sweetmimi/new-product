import axiosInstance from '@/interceptors/axios'
import {
  orderApi,
  singApi
}
from '@/constants/api'
export const getchannel = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: orderApi.getchannel,
    data: data
  }).then((res) => {
    callback(res)
  })
}
export const getOrderList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: orderApi.list,
    data: data
  }).then((res) => {
    callback(res)
  })
}
export const retryLoan = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: orderApi.retryLoan,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const loanFail = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: orderApi.loanFail,
    data: data
  }).then((res) => {
    callback(res)
  })
}


export const getOrderInfo = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: orderApi.info,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const getOrderSelect = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: orderApi.select,
    data: data
  }).then((res) => {
    callback(res)
  })
}

// sing
export const getSingOrderList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: singApi.getList,
    data: data
  }).then((res) => {
    callback(res)
  })
}
