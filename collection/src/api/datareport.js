import axiosInstance from '@/interceptors/axios'
import { datareportApi } from '@/constants/api'

export const getCumulativeData = (data, callback) => {
  axiosInstance({
    method: 'get',
    url: datareportApi.cumulativeData,
    data: data
  }).then((res) => {
    callback(res)
  })
}
export const getsearchnamelist = (data, callback) => {
  axiosInstance({
    method: 'get',
    url: datareportApi.searchnamelist,
    data: data
  }).then((res) => {
    callback(res)
  })
}
export const apiachievement = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: datareportApi.achievement,
    data: data
  }).then((res) => {
    callback(res)
  })
}
export const apidaihoulist = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: datareportApi.daihoulist,
    data: data
  }).then((res) => {
    callback(res)
  })
}
export const exportAchievement = (data, callback) => {
  axiosInstance({
    method: 'get',
    url: datareportApi.achievement,
    data: data
  }).then((res) => {
    callback(res)
  })
}
export const exportDaihoulist = (data, callback) => {
  axiosInstance({
    method: 'get',
    url: datareportApi.daihoulist,
    data: data
  }).then((res) => {
    callback(res)
  })
}
export const daihoutaskornamelist = (data, callback) => {
  axiosInstance({
    method: 'get',
    url: datareportApi.daihoutaskornamelist,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const getcuishoustafflist = (data, callback) => {
  axiosInstance({
    method: 'get',
    url: datareportApi.cuishoustafflist,
    data: data
  }).then((res) => {
    callback(res)
  })
}


export const getusertaskstatuslist = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: datareportApi.usertaskstatuslist,
    data: data
  }).then((res) => {
    callback(res)
  })
}


export const getdaihoustafflist = (data, callback) => {
  axiosInstance({
    method: 'get',
    url: datareportApi.daihoustafflist,
    data: data
  }).then((res) => {
    callback(res)
  })
}



export const getallfollowertaskstatuslist = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: datareportApi.allfollowertaskstatuslist,
    data: data
  }).then((res) => {
    callback(res)
  })
}


export const apiContactHeader = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: datareportApi.contactHeader,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const apiContactList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: datareportApi.contactList,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const apiContactHistoryList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: datareportApi.contactHistoryList,
    data: data
  }).then((res) => {
    callback(res)
  })
}



