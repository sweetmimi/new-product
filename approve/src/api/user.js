import axiosInstance from '@/interceptors/axios'
import { userApi,homeApi,financeApi } from '@/constants/api'

export const createva = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: homeApi.createva,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const getva = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: homeApi.getva,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const dashboardShow = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: homeApi.show,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const withdraw = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: homeApi.withdraw,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const lenderData = (data, callback) => {
  axiosInstance({
    method: 'get',
    url: homeApi.lenderData,
    data: data
  }).then((res) => {
    callback(res)
  })
}
export const getUserList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: userApi.getUserList,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const operateAction = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: userApi.operateAction,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const editExtnumber = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: userApi.editExtnumber,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const checkIsOnline = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: userApi.statuscheck,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const setOnline = (data, callback, errCallback) => {
  axiosInstance({
    method: 'post',
    url: userApi.setOnline,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const getDownloadList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: userApi.downloadlist,
    data: data
  }).then((res) => {
    callback(res)
  })
}


export const getCustomerList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: userApi.getcustomer,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const customerDestroy = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: userApi.destroycustomer,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const getlendinfo = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: homeApi.getlendinfo,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const getallbalance = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: homeApi.getallbalance,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const getMonthReport = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: homeApi.getMonthReport,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const financeGetaccount = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: financeApi.financeGetaccount,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const financeGetrdlamount = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: financeApi.financeGetrdlamount,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const financeSaveaccount = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: financeApi.financeSaveaccount,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const financeRemitrecord = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: financeApi.financeRemitrecord,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const financeApplyremit = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: financeApi.financeApplyremit,
    data: data
  }).then((res) => {
    callback(res)
  })
}
