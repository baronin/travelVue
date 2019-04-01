import Vue from 'vue'
import App from './views/App/App.vue'
import router from './router'
import moment from 'moment'
import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker'
import 'vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css'
import optionsForDatepicker from './assets/helpers/datepicker.options'
import VueSelect from 'vue-cool-select'
import toggle from '../src/assets/components/dropdown/toggle'

Vue.directive('toggle', toggle);

const datepickerOptions = optionsForDatepicker.data().Options;
Vue.use(AirbnbStyleDatepicker, datepickerOptions);
Vue.use(require('moment'));
Vue.config.productionTip = false;
Vue.prototype.moment = moment;


Vue.use(VueSelect, {
  theme: 'bootstrap' // or 'material-design'
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
