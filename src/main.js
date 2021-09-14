import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import './index.css'
import router from './router'

Vue.config.productionTip = false
Vue.use(axios)

axios.defaults.baseURL = 'http://localhost:2000/v1/api'
axios.defaults.headers.common['Content-Type'] = 'application/json' 

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
