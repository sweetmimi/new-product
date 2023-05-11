import Vue from 'vue'
import App from '@/App.vue'
import router from './router'
import store from './store'

import iView from 'iview'
import VueI18n from 'vue-i18n'
import 'iview/dist/styles/iview.css'
import '@/common/css/common.scss'

import en from 'iview/dist/locale/en-US'
import zh from 'iview/dist/locale/zh-CN'
import idLang from 'iview/dist/locale/id-ID'

import enLocal from './locale/us'
import zhLocal from './locale/zh-cn'
import endIdLocal from './locale/en-id'
// highcharts

import Highcharts from 'vue-highcharts'
Vue.use(Highcharts)

//echart
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
const {LoadingBar} = iView

Vue.config.productionTip = false
Vue.use(VueI18n)

const setLanguage = () => {
  window.lang = localStorage.getItem('lang') || 'zh-cn'
}

setLanguage()
const i18n = new VueI18n({
  locale: window.lang,
  messages: {
    'en': Object.assign(enLocal, en),
    'zh-cn': Object.assign(zhLocal, zh),
    'id-ID': Object.assign(endIdLocal, idLang)
  }
})

Vue.use(iView, { i18n: function (path: any, options: any) {
  return i18n.t(path, options)
}})

router.beforeEach((to, from, next) => {
  LoadingBar.start()
  next()
})

router.afterEach(route => {
  LoadingBar.finish()
  window.scrollTo(0, 0)
})

Vue.prototype._i18n = i18n
new Vue({
  i18n,
  store,
  router,
  render: h => h(App),
  methods: {
    moreChart() {
      const  options = this.getMoreOptions(this.type)
      if (this.chart) {
        this.chart.destroy()
      }
      // 
      this.chart = new Highcharts.Chart('highcharts-more', options)
    }
  }
}).$mount('#app')
