import axiosInstance from '@/interceptors/axios'
import { dataReportApi } from '@/constants/api'

export const getList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.getList,
    data: data
  }).then((res) => {
    callback(res)
  })
}
