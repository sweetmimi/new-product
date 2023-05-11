import axiosInstance from '@/interceptors/axios'
import { selectApi } from '@/constants/api'
import { QueryInfo, Result } from '@/constants/variableType'

export const getSelectItems = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: selectApi.select,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const orderStatus = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: selectApi.orderStatus,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}
