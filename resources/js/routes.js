import StoreCheckout from '@comp/StoreCheckout.vue'
import HomePage from '@comp/HomePage.vue'
import ProductPage from '@comp/ProductPage.vue'
import CartPage from '@comp/CartPage.vue'
import CategoryPage from '@comp/CategoryPage.vue'
import Register from '@comp/Register.vue'
import Login from '@comp/Login.vue'
import UserList from '@comp/Users/List.vue'
import ShowUser from '@comp/Users/ShowUser.vue'

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
            },
            {
                path: 'show/:id',
                name: 'user.show',
                component: ShowUser,
            }
        ]
    }
];
export default routes;