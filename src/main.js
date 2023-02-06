import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

// helpers
import toggle from './helpers/toggle'
import optionsForDatepicker from './helpers/datepicker.options'

// directives
import resize from './directives/v-resize'

// Plugins
import moment from 'moment'
import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker'
import VueSelect from 'vue-cool-select'
import VuePhoneNumberInput from 'vue-phone-number-input'

// css
import 'vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'

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
