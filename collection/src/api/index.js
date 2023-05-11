import axiosInstance from '@/interceptors/axios'
import { taskApi, loginApi, userApi } from '@/constants/api'

export const getVcode = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: loginApi.vcode,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const login = (data, callback) => {
  //console.log(loginApi.login)
  axiosInstance({
    method: 'post',
    url: loginApi.login,
    data: data

  })
    .then((res) => {
      callback(res)
    })
}

export const resetPassword = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: loginApi.resetPassword,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const logOut = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: loginApi.logout,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const getBaseInfo = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.baseInfo,
    data: data,
    responseType: 'text'
  })
    .then((res) => {
      callback(res)
    })
}

export const getOrderInfo = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.orderInfo,
    data: data,
    responseType: 'text'
  })
    .then((res) => {
      callback(res)
    })
}

export const getOverdueList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.overdueList,
    data: data,
    responseType: 'text'
  })
    .then((res) => {
      callback(res)
    })
}

export const getContactList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.getContactList,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const getContactInfo = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.getContactInfo,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const saveCollecctRecord = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.saveCollecctRecord,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const dialCall = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.dialCall,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const hangUp = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.hangUp,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const getCollectRecord = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.getCollectRecord,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const getCallList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.getCallList,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const getRepaymenPlanList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.getRepaymenPlanList,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const getCuiShouList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.getCuiShouList,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const setContactInfo = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.setContactInfo,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const getSelectOptions = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: userApi.listSelect,
    data: data
  })
    .then(res => {
      callback(res)
    })
}

export const getUserList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: userApi.getUserList,
    data: data
  })
    .then(res => {
      callback(res)
    })
}

export const getUserInfo = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: userApi.getUserInfo,
    data: data
  })
    .then(res => {
      callback(res)
    })
}

export const postUserInfo = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: userApi.postUserInfo,
    data: data
  })
    .then(res => {
      callback(res)
    })
}
