import * as types from './mutation-types'

const mutations = {
  [types.GET_LISTSELECT] (state, listSelect) {
    state.listSelect = listSelect
  },
  [types.GET_USERINFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  [types.SET_USERINFO] (state, userInfo) {
    state.userInfo = userInfo
  }
}
export default mutations
