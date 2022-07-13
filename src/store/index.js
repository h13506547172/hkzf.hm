import Vue from 'vue'
import Vuex from 'vuex'
import { setItem } from '@/utils/storage'

Vue.use(Vuex)
const TOKENSTR = 'token'
export default new Vuex.Store({
  state: {
    userToken: null
  },
  getters: {},
  mutations: {
    setUserToken(state, data) {
      state.userToken = data
      setItem(TOKENSTR, data)
    }
  },
  actions: {},
  modules: {}
})
