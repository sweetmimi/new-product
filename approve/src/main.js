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

// import Blob from './assets/js/Blob'
// import Export2Excel from './assets/js/Export2Excel'

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
  let isAdmin = (/role_approve_admin/).test(localStorage.getItem('u.info'))
  let isUser = (/role_approver/).test(localStorage.getItem('u.info'))
  if ((/userlist|approvalList/).test(path) && !isAdmin) {
    iView.Modal.warning({
      content: 'tidak ada izin',
      onOk: function () {
        window.location.href = '/login'
      }
    })
    return false
  }
  if ((/tasklist|history/).test(path) && !isUser) {
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
    store.dispatch('getOnlineStatus')
  }
  if (to.name === 'login') {
    isFetch = false
  }
  if (judgeRole(to.name)) {
    next()
  }
  // next()
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
