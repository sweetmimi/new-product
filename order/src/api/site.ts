import axiosInstance from '@/interceptors/axios'
import { siteApi } from '@/constants/api'
import { UserInfo, Password, Result} from '@/constants/variableType'

// login  module
export const login = (data: UserInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: siteApi.login,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}
export const loginOut = (callback?: any) => {
  axiosInstance({
    method: 'post',
    url: siteApi.logout
  }).then((res: Result) => {
    callback(res)
  })
}

export const getVcode = (callback?: any) => {
  axiosInstance({
    method: 'post',
    url: siteApi.getVerifyCode,
  }).then((res: Result) => {
    callback(res)
  })
}

// resetpassword module
export const changePassword = (data: Password, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: siteApi.changePassword,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}


export const SwitchMessages = (data: Password, callback?: any) => {
  axiosInstance({
    method: 'get',
    url: siteApi.SwitchMessages,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}
