import Vue from 'vue'
import App from './App'
import iView from 'iview'
import VueI18n from 'vue-i18n'
import store from './store'
import router from './router'
import 'iview/dist/styles/iview.css'
import '@/common/css/common.scss'
import '@/common/css/theme.less'

import en from 'iview/dist/locale/en-US'
import zh from 'iview/dist/locale/zh-CN'
import idLang from 'iview/dist/locale/id-ID'

import enLocal from './locale/us'
import endIdLocal from './locale/en-id'

import Viewer from 'iview'
// import 'viewerjs/dist/viewer.css'

//echart
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

//import {TimeSelect,DatePicker,TimePicker} from 'element-ui'

//  import 'element-ui/lib/theme-chalk/index.css';
//  Vue.use(ElementUI);

// Vue.use(TimeSelect);
// Vue.use(DatePicker);
// Vue.use(TimePicker);


Vue.use(Viewer);


Vue.config.productionTip = false
Vue.locale = () => {}
Vue.use(VueI18n)
Vue.use(iView, {
  i18n: function (path, options) {
    let value = i18n.t(path, options)
    if (value !== null && value !== undefined) {
      return value
    }
    return ''
  }
})
Vue.filter('moneyFormat', function (value) {
  return value && value.toString().replace(/(^|\s)\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
})
const setLanguage = () => {
  const params = window.location.href
  window.lang = localStorage.getItem('lang') || 'id-ID'
  if ((/lang=cn/).test(params)) {
    window.lang = 'zh-cn'
  }
  if ((/lang=en/).test(params)) {
    window.lang = 'en'
  }
  if ((/lang=id/).test(params)) {
    window.lang = 'id-ID'
  }
  localStorage.setItem('lang', window.lang)
}
setLanguage()
const i18n = new VueI18n({
  locale: window.lang,
  messages: {
    'en': Object.assign(enLocal, en),

    'id-ID': Object.assign(endIdLocal, idLang)
  }
})
const judgeRole = (path) => {
  let isCuishouAdmin = /role_cuishou_admin/.test(localStorage.getItem('u.info')),
      isDaihouAdmin = /role_daihou_admin/.test(localStorage.getItem('u.info')),
      isCuishouUser = /role_cuishouer/.test(localStorage.getItem('u.info')),
      isDaihouUser = /role_daihou_checker/.test(localStorage.getItem('u.info'));
  if ((/^[userList|case|history]$/).test(path) && !isCuishouAdmin) {
    iView.Modal.warning({
      content: 'tidak ada izin',
      onOk: function () {
        window.location.href = '/login'
      }
    })
    return false
  }
  if ((/^[userList|loaned]$/).test(path) && !isDaihouAdmin) {
    iView.Modal.warning({
      content: 'tidak ada izin',
      onOk: function () {
        window.location.href = '/login'
      }
    })
    return false
  }
  if ((/^[tasklist|taskorder]$/).test(path) && !isCuishouUser) {
    iView.Modal.warning({
      content: 'tidak ada izin',
      onOk: function () {
        window.location.href = '/login'
      }
    })
    return false
  }
  if ((/^[loanedhistory|loanedlist]$/).test(path) && !isDaihouUser) {
    iView.Modal.warning({
      content: 'tidak ada izin',
      onOk: function () {
        window.location.href = '/login'
      }
    })
    return false
  }
  return true
}

/* eslint-disable no-new */
let isFetch = false
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  if (to.name !== 'login' && !isFetch) {
    isFetch = true
    store.dispatch('getSelectList')
  }
  if (judgeRole(to.name)) {
    next()
  }
})

router.afterEach(route => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})
new Vue({
  el: '#app',
  i18n,
  store,
  router,
  components: { App },
  template: '<App/>'
})
