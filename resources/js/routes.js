import StoreCheckout from '../components/StoreCheckout.vue'
import HomePage from '../components/HomePage.vue'
import ProductPage from '../components/ProductPage.vue'
import CartPage from '../components/CartPage.vue'
import CategoryPage from '../components/CategoryPage.vue'
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'
import UserList from '../components/Users/List.vue'

const routes = [
    {
        path: '/checkout',
        component: StoreCheckout,
        name: 'store.checkout',
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/',
        component: HomePage,
        name: 'store.index',
    },
    {
        path: '/product',
        component: ProductPage,
        name: 'store.productdetails',
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/cart',
        component: CartPage,
        name: 'store.cart',
    },
    {
        path: '/category',
        component: CategoryPage,
        name: 'store.category',
    },
    {
        path: '/register',
        component: Register,
        name: 'store.register',
    },
    {
        path: '/login',
        component: Login,
        name: 'store.login',
    },
    {
        path:'/user',
        name: 'user',
        component: { render : h => h('router-view') },
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: 'list',
                name: 'user.list',
                component: UserList,
                
            }
        ]
    }
];
export default routes;