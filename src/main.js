import Vue from 'vue'
import App from './views/App/App.vue'
import router from './router'
import VueSelect from 'vue-cool-select'

Vue.config.productionTip = false;

Vue.use(VueSelect, {
  theme: 'bootstrap' // or 'material-design'
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
