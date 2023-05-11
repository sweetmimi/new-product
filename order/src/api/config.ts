import axiosInstance from '@/interceptors/axios'
import { configApi } from '@/constants/api'
import { QueryInfo, Result} from '@/constants/variableType'

export const getProductList = (data: any,callback?: any) => {
  axiosInstance({
    method: 'post',
    url: configApi.getProductList,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}
export const getProductConfig = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: configApi.getProductConfig,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}
export const saveProductConfig = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: configApi.saveProductConfig,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const getSourceProduct = (data: any,callback?: any) => {
  axiosInstance({
    method: 'post',
    url: configApi.getsourceproduct,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const saveSourceProduct = (data: any,callback?: any) => {
  axiosInstance({
    method: 'post',
    url: configApi.savesourceproduct,
    data: data,
  }).then((res: Result) => {
    callback(res)
  })
}
export const getlistbychannelProduct = (data: any,callback?: any) => {
  axiosInstance({
    method: 'post',
    url: configApi.getlistbychannel,
    data: data,
  }).then((res: Result) => {
    callback(res)
  })
}

export const getSourceProductLog = (data: any,callback?: any) => {
  axiosInstance({
    method: 'post',
    url: configApi.SourceProductLog,
    data: data,
  }).then((res: Result) => {
    callback(res)
  })
}



export const Downloadlinktijiao = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: configApi.Downloadlink,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const Downloadlink = (data: any, callback?: any) => {
  axiosInstance({
    method: 'get',
    url: configApi.Downloadlink,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}









export const Downloadgetlink = (data: any, callback?: any) => {
         axiosInstance({
           method: 'get',
           url: configApi.innerlink,
           data: data
         }).then((res: Result) => {
           callback(res)
         })
       }
    export const Downloadpostlink = (data: any, callback?: any) => {
         axiosInstance({
           method: 'post',
           url: configApi.innerlink,
           data: data
         }).then((res: Result) => {
           callback(res)
         })
       }

export const productHistory = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: configApi.productHistory,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const productVersionHistory = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: configApi.productVersionHistory,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const SaveRolloverNewConf = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: configApi.SaveRolloverNewConf,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}
