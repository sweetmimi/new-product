import axiosInstance from '@/interceptors/axios'
import { approvalApi } from '@/constants/api'

export const getList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: approvalApi.getList,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const changeCheckUser = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: approvalApi.checkchangeuser,
    data: data
  }).then(res => {
    callback(res)
  })
}

export const saveCheckUser = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: approvalApi.savecheckuser,
    data: data
  }).then(res => {
    callback(res)
  })
}

export const getPhoneReview = (data, callback) => {
  axiosInstance({
    method: 'get',
    url: approvalApi.getPhoneReview,
    data: data
  }).then(res => {
    callback(res)
  })
}

export const savePhoneReview = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: approvalApi.savePhoneReview,
    data: data
  }).then(res => {
    callback(res)
  })
}

export const manualapprovelist = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: approvalApi.manualapprovelist,
    data: data
  }).then(res => {
    callback(res)
  })
}

export const commitapproveconclusion = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: approvalApi.commitapproveconclusion,
    data: data
  }).then(res => {
    callback(res)
  })
}
