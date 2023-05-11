import axiosInstance from '@/interceptors/axios'
import { orderApi, repayApi} from '@/constants/api'
import { QueryInfo, Result } from '@/constants/variableType'

export const getOrderList = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: orderApi.list,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}
export const retryLoan = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: orderApi.retryLoan,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const loanFail = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: orderApi.loanFail,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}


export const getOrderInfo = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: orderApi.info,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}
export const getOrderHistory = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: orderApi.rolloverInfo,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apklinkmanageGet = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'get',
    url: orderApi.apklinkmanage,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apklinkmanagePost = (data:any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: orderApi.apklinkmanage,
    headers: { 'Content-Type': 'multipart/form-data'},

    data: data
  }).then((res: Result) => {
    callback(res)
  })
}


export const getRepayplanlist = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: repayApi.getplanlist,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const getRepaydropcode = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: repayApi.dropcode,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const getRepaysms = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: repayApi.repaysms,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const getRepayoption = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: repayApi.option,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}
