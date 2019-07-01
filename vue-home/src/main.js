import Vue from 'vue'
import App from './App.vue'
import router from './router'
import api from './api/api'

Vue.config.productionTip = false
Vue.use(api)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
