import axiosInstance from '@/interceptors/axios'
import { loanApi } from '@/constants/api'
import { QueryInfo, Result } from '@/constants/variableType'

export const getLoanList = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: loanApi.list,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}
export const getLoanInfo = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: loanApi.info,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}



export const pingzhang = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: loanApi.ping,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}



export const opentransferaccount = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: loanApi.opentransferaccount,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const gettransferbanklist = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'get',
    url: loanApi.gettransferbanklist,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}


export const changerransferbankinfo = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: loanApi.changerransferbankinfo,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}



export const getfdcorderinfo = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: loanApi.getfdcorderinfo,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const remarkSaveComment = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: loanApi.savecomment,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const commitinsure = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: loanApi.commitinsure,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const getLoancert = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: loanApi.loancert,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const getFdcList = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: loanApi.FdcList,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}
