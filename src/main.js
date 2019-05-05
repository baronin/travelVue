import Vue from 'vue'
import App from './views/App/App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker'
import 'vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css'
import optionsForDatepicker from './assets/helpers/datepicker.options'
import VueSelect from 'vue-cool-select'
import toggle from './assets/helpers/toggle'
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import resize from './assets/directives/v-resize'

Vue.directive('toggle', toggle);
Vue.directive('resize', resize);
Vue.component('vue-phone-number-input', VuePhoneNumberInput)

const datepickerOptions = optionsForDatepicker.data().Options;
Vue.use(AirbnbStyleDatepicker, datepickerOptions);
Vue.use(require('moment'));
Vue.config.productionTip = false;
Vue.prototype.moment = moment;

window.moment = moment; // for develop only

Vue.use(VueSelect, {
  theme: 'bootstrap' // or 'material-design'
})

new Vue({
  render: h => h(App),
  router,
  store,

}).$mount('#app')
