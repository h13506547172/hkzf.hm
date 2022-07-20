import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)
const TOKENSTR = 'token'
const CITYSTR = 'city_str'
export default new Vuex.Store({
  state: {
    userToken: getItem(TOKENSTR) || null, // 可优化为{}，判断{}.token
    cityName: getItem(CITYSTR) || '北京'
  },
  getters: {},
  mutations: {
    setUserToken(state, data) {
      state.userToken = data
      setItem(TOKENSTR, data)
    },
    // 存储城市列表数据
    setCityName(state, data) {
      state.cityName = data
      setItem(CITYSTR, data)
    }
  },
  actions: {},
  modules: {}
})
