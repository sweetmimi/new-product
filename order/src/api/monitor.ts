import axiosInstance from '@/interceptors/axios'
import { monitorApi, retryconfigApi, lenderApi} from '@/constants/api'
import { QueryInfo, Result } from '@/constants/variableType'

export const getApplyConfigList = (callback?: any) => {
  axiosInstance({
    method: 'post',
    url: monitorApi.ApplyConfig,
  }).then((res: Result) => {
    callback(res)
  })
}
export const saveApplyConfig = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: monitorApi.SaveConfig,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}


export const retryConfig = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: retryconfigApi.retryConfig,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const retrySave = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: retryconfigApi.retrySave,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const retryRecord = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: retryconfigApi.retryRecord,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}



export const ApiGetlenderbalance = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: lenderApi.getlenderbalance,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const ApiSavelendersort = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: lenderApi.savelendersort,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const ApiSwitchlenderaccount = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: lenderApi.switchlenderaccount,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}


export const ApicustomerBlacklist = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: monitorApi.Blacklist,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const ApicustomerBlacksave = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: monitorApi.Blacksave,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const ApicustomerBlackremove = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: monitorApi.Blackremove,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const ApiloginBlacklist = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: monitorApi.loginBlacklist,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const ApiloginBlacklistsave = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: monitorApi.loginBlacklistsave,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const ApiloginBlacklistremove = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: monitorApi.loginBlacklistremove,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}
