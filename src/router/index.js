import Vue from 'vue'
import VueRouter from 'vue-router'
import Result from '../views/ResultComponent/ResultComponent'
import TheMain from '../components/the-main/the-main'
import PassengerInfo from '../components/the-passengerInfo/passenger-info'
import Review from '../components/review/review'
import Posts from '@/pages/posts'

Vue.use(VueRouter)

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
        {
          path: '/posts',
          name: 'the-posts',
          component: Posts,
        },
      ],
    },
  ],
})
