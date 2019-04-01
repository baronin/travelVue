import Vue from 'vue';
import VueRouter from 'vue-router';
import Result from '../views/ResultComponent/ResultComponent'
import MainComponent from '../views/MainComponent/MainComponent'

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: MainComponent
        },
        {
            path: '/result',
            name: 'result',
            component: Result
        },
        {
            path: '*',
            component: MainComponent
        },
    ]
});