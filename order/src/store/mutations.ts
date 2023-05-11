import * as types from './mutation-types'
import { MutationTree } from 'vuex'

const mutations: MutationTree<any> = {
  [types.GET_SELECT_ITEMS](state: any, selectItems: []) {
    state.selectItems = selectItems
  }
}

export default mutations
