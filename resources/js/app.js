require('./bootstrap');
window.Vue = require('vue');

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../components/App.vue'
import routes from './routes'
import index from './store'
import Notifications from 'vue-notification'
import vDialogs from 'v-dialogs'
import i18n from './lang/i18n'
import VueLazyload from 'vue-lazyload'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import vi from 'element-ui/lib/locale/lang/vi'
import locale from 'element-ui/lib/locale'
import VueDataTables from 'vue-data-tables'

locale.use(vi)

Vue.use(VueRouter)
Vue.use(Notifications)
Vue.use(vDialogs)
Vue.use(ElementUI)
Vue.use(VueLazyload, {
    loading: 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif',
})
Vue.use(VueDataTables)


const router = new VueRouter({
    routes,
    mode: 'history'
});
window.events = new Vue();
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const currentUser = index.state.user.user;

    if (requiresAuth && !currentUser) {
        next('/login');
    } else if (to.path == '/login' && currentUser) {
        next('/');
    } else {
        next();
    }
})

const app = new Vue({
    el: '#app',
    render: h => h(App),
    i18n,
    router,
    store: index
});

export default app
