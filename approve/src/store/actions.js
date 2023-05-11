import * as types from './mutation-types'
import { checkIsOnline, setOnline } from '@/api/user'
import { getSelectOptions } from '@/api/index'
const getOnlineStatus = ({commit}, params) => {
  return new Promise((resolve, reject) => {
    checkIsOnline(params, res => {
      const onlineStatus = +res.data.onlineStatus
      commit(types.GET_ONLINESTATUS, onlineStatus)
      resolve(res.data)
    })
  })
}

const setOnlineStatus = ({commit}, params) => {
  return new Promise((resolve, reject) => {
    setOnline(params, res => {
      commit(types.GET_ONLINESTATUS, params.onlineStatus)
      resolve(res.data)
    })
  })
}

const getSelectList = ({commit}, params) => {
  return new Promise((resolve, reject) => {
    getSelectOptions(params, res => {
      commit(types.GET_LISTSELECT, res.data)
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
      mid: info[2],
      staffRole: roles
    })
  }
  
}
const setUserInfo = ({commit}, params) => {

  localStorage.setItem('u.info', [params.userName, params.staffRole.join('.'), params.mid].join('$%.?'))
  commit(types.GET_USERINFO, params)
}
const actions = {
  getOnlineStatus,
  setOnlineStatus,
  getSelectList,
  getUserInfo,
  setUserInfo
}
export default actions
