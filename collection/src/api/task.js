import axiosInstance from '@/interceptors/axios'
import { taskApi } from '@/constants/api'

export const getTaskList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.myTaskList,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const getApproveList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.getApproveList,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const getOperateList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.getOperateList,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const getContactTypeList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.getContactTypeList,
    data: data
  }).then((res) => {
    callback(res)
  })
}


export const getdaihouContactTypeList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.getdaihouContactTypeList,
    data: data
  }).then((res) => {
    callback(res)
  })
}
export const againGetContactList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.againGetContactList,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const getPhoneReview = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.phoneReview,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const performanceConfig = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.performanceConfig,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const getPerformance = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.getPerformance,
    data: data
  }).then((res) => {
    callback(res)
  })
}


export const getCallList = (data, callback) => {
  axiosInstance({
      method: 'post',
      url: taskApi.getConclusionHistory,
      data: data
    })
    .then((res) => {
      callback(res)
    })
}

export const lianxidianhua = (data, callback) => {
  axiosInstance({
      method: 'post',
      url: taskApi.lianxidianhua,
      data: data
    })
    .then((res) => {
      callback(res)
    })
}




export const getConclusionHistory = (data, callback) => {
  axiosInstance({
      method: 'post',
      url: taskApi.getConclusionHistory,
      data: data
    })
    .then((res) => {
      callback(res)
    })
}


export const getsendrepaymentcode = (data, callback) => {
  axiosInstance({
      method: 'get',
      url: taskApi.sendrepaymentcode,
      data: data
    })
    .then((res) => {
      callback(res)
    })
}

export const deleterepaymentcode = (data, callback) => {
  axiosInstance({
      method: 'post',
      url: taskApi.sendrepaymentcode,
      data: data
    })
    .then((res) => {
      callback(res)
    })
}
export const postsendrepaymentcode = (data, callback) => {
  axiosInstance({
      method: 'post',
      url: taskApi.sendrepaymentcode,
      data: data
    })
    .then((res) => {
      callback(res)
    })
}



export const getrepaymentrecordlist = (data, callback) => {
  axiosInstance({
      method: 'post',
      url: taskApi.getrepaymentrecordlist,
      data: data
    })
    .then((res) => {
      callback(res)
    })
}

//
export const setCuishouLog = (data, callback) => {
  axiosInstance({
      method: 'post',
      url: taskApi.setCuishouLog,
      data: data
    })
    .then((res) => {
      callback(res)
    })
}
export const addSot = (data, callback) => {
  axiosInstance({
      method: 'post',
      url: taskApi.addSot,
      data: data
    })
    .then((res) => {
      callback(res)
    })
}

export const getTaskBill = (data, callback) => {
  axiosInstance({
      method: 'post',
      url: taskApi.getBill,
      data: data
    })
    .then((res) => {
      callback(res)
    })
}
