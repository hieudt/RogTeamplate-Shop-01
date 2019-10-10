require('./bootstrap');
window.Vue = require('vue');

import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '../components/App.vue';
import routes from './routes';
import usersStore from './store/usersStore';
import Notifications from 'vue-notification'

Vue.use(VueRouter);
Vue.use(Notifications);

const router = new VueRouter({
    routes,
});
window.events = new Vue();


new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store: usersStore
});

