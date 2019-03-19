import Vue from 'vue'
import App from './views/App/App.vue'
import router from './router'
import vSelect from 'vue-select'

Vue.config.productionTip = false
Vue.component('v-select', vSelect);


new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
