import axiosInstance from '@/interceptors/axios'
import { customerApi, dashboardApi, whitelistApi } from '@/constants/api'
import { QueryInfo, Result } from '@/constants/variableType'

export const getList = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: customerApi.getList,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}
export const getDetail = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: customerApi.getDetail,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}
export const customerDestroy = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: customerApi.destroy,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const Request = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method:  'get',
    url: dashboardApi.Request,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}


export const Smsarriverate = (data: QueryInfo, callback?: any) => {
         axiosInstance({
           method: 'get',
           url: dashboardApi.Smsarriverate,
           data: data
         }).then((res: Result) => {
           callback(res)
         })
       }

export const Codearriverate = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: dashboardApi.Codearriverate,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const Matching = (data: QueryInfo, callback?: any) => {
         axiosInstance({
           method: 'post',
           url: dashboardApi.Matching,
           data: data,
          //  responseType: 'blob'
         }).then((res: Result) => {
           callback(res)
         })
       }

export const Fxiuser = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: dashboardApi.Fxiuser,
    data: data,
    //  responseType: 'blob'
  }).then((res: Result) => {
    callback(res)
  })
}

export const HistoricalData = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'get',
    url: dashboardApi.HistoricalData,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const Timeorder = (data: QueryInfo, callback?: any) => {
 axiosInstance({
       method: 'get',
       url: dashboardApi.Timeorder,
       data: data
     }).then((res: Result) => {
       callback(res)
     })
       }

       // lendingRates

export const lendingRates = (data: QueryInfo, callback?: any) => {
         axiosInstance({
           method: 'get',
           url: dashboardApi.lendingRates,
           data: data
         }).then((res: Result) => {
           callback(res)
         })
       }
export const lendingRates2 = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'get',
    url: dashboardApi.lendingRates2,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const getMonitor = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'get',
    url: dashboardApi.whitelistmonitor,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const postMonitor = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: dashboardApi.whitelistmonitor,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const exportWhitelist = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: dashboardApi.exportwhitelist,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const whitelistIndex = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'get',
    url: whitelistApi.whitelistIndex,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}
export const updatewhitelist = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: whitelistApi.updatewhitelist,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}


export const getApidocking = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: dashboardApi.getApidocking,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}


export const ApiexportReloanrecall = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: dashboardApi.reloanrecall,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}
