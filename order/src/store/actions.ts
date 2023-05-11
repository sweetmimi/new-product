import * as types from './mutation-types'
import { ActionTree, Action } from 'vuex'

import { getSelectItems } from '@/api/select'



const getSelectList: Action<object, object> = ({ commit }, params) => {
  return new Promise((resolve, reject) => {
    getSelectItems(params, (res: any) => {
      if (+res.code === 0 && res.data) {
        const data = res.data
        commit(types.GET_SELECT_ITEMS, data)
        resolve(data)
      } else {
        reject(res.msg)
      }
    })
  })
}


const actions: ActionTree<object, object> = {
  getSelectList
}

export default actions
