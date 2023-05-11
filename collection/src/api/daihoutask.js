import axiosInstance from '@/interceptors/axios'
import { daihoutaskApi } from '@/constants/api'

export const getLoanedList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: daihoutaskApi.myTaskList,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const getLoanedHistory = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: daihoutaskApi.myHistoryList,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const getDaihouLogList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: daihoutaskApi.daihouLogList,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const getDaihouHistoryList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: daihoutaskApi.getdaihoutasklist,
    data: data
  }).then((res) => {
    callback(res)
  })
}


export const getCuishouIvrLogList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: daihoutaskApi.getCuishouIvrLogList,
    data: data
  }).then((res) => {
    callback(res)
  })
}


export const getIvrLogList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: daihoutaskApi.getIvrLogList,
    data: data
  }).then((res) => {
    callback(res)
  })
}



export const getDaihouTaskList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: daihoutaskApi.daihouTaskList,
    data: data
  }).then((res) => {
    callback(res)
  })
}


export const IvrTaskList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: daihoutaskApi.IvrTaskList,
    data: data
  }).then((res) => {
    callback(res)
  })
}


export const saveDaiHouLog = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: daihoutaskApi.saveDaiHouLog,
    data: data
  }).then((res) => {
    callback(res)
  })
}


export const getFollowUser = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: daihoutaskApi.getFollowUser,
    data: data
  }).then(res => {
    callback(res)
  })
}


export const saveFollowUser = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: daihoutaskApi.saveFollowUser,
    data: data
  }).then(res => {
    callback(res)
  })
}


export const getRolloverInfo = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: daihoutaskApi.rolloverInfo,
    data: data
  }).then((res) => {
    callback(res)
  })
}
