import * as types from './mutation-types'
import { getSelectOptions } from '@/api/index'

const getSelectList = ({commit}, params) => {
  return new Promise((resolve, reject) => {
    getSelectOptions(params, res => {
      commit(types.GET_LISTSELECT, res.data)
      console.log(res,9999)
      resolve(res.data)
    })
  })
}
const getUserInfo = ({commit}) => {
  let userInfo = localStorage.getItem('u.info')
  if (userInfo) {
    let info = userInfo.split('$%.?')
    let roles = []
    info[1].split('.').map((item) => {
      roles.push(item)
    })
    commit(types.SET_USERINFO, {
      userName: info[0],
      staffRole: roles
    })
  }
}
const setUserInfo = ({commit}, params) => {

  localStorage.setItem('u.info', [params.userName, params.staffRole.join('.')].join('$%.?'))
  commit(types.GET_USERINFO, params)
}
const actions = {
  getSelectList,
  getUserInfo,
  setUserInfo
}
export default actions
