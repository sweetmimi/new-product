import axiosInstance from '@/interceptors/axios'
import { dashboardApi, investorApi } from '@/constants/api'
import { QueryInfo, Result} from '@/constants/variableType'

export const getDashboard = (callback?: any) => {
  axiosInstance({
    method: 'post',
    url: dashboardApi.getDashboard
  }).then((res: Result) => {
    callback(res)
  })
}

export const changeBalance = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: investorApi.changeBalance,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}
