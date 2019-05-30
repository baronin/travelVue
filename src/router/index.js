import Vue from 'vue';
import VueRouter from 'vue-router';
import Result from '../views/ResultComponent/ResultComponent';
import TheMain from '../assets/components/the-main/the-main';
import PassengerInfo
  from '../assets/components/the-passengerInfo/passenger-info';
import Review from '../assets/components/review/review';
import qs from 'qs';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: TheMain,
      children: [
        {
          path: '/result',
          name: 'result',
          component: Result,
        },
        {
          path: '/passenger-info',
          name: 'passenger-info',
          component: PassengerInfo,
        },
        {
          path: '/review',
          name: 'review',
          component: Review,
        },
      ],
    },
  ],
  parseQuery(query) {
    return qs.parse(query, {
      decoder(str, decoder, charset) {
        const strWithoutPlus = str.replace(/\+/g, ' ');
        if (charset === 'iso-8859-1') {
          // unescape never throws, no try...catch needed:
          return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
        }

        if (/^(\d+|\d*\.\d+)$/.test(str)) {
          return parseFloat(str);
        }

        const keywords = {
          true: true,
          false: false,
          null: null,
          undefined,
        };
        if (str in keywords) {
          return keywords[str];
        }

        // utf-8
        try {
          return decodeURIComponent(strWithoutPlus);
        } catch (e) {
          return strWithoutPlus;
        }
      },
    });
  },
  stringifyQuery(query) {
    var result = qs.stringify(query, { encode: true });

    return result ? ('?' + result) : '';
  },
});