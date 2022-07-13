import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入动态设置rem基准值
import 'amfe-flexible'
// 引入所有vant组件
import Vant from 'vant'
import 'vant/lib/index.css'
import '@/assets/font/iconfont.css'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
