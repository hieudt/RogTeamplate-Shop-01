import StoreCheckout from '../components/StoreCheckout.vue'
import HomePage from '../components/HomePage.vue'
import ProductPage from '../components/ProductPage.vue'
import CartPage from '../components/CartPage.vue'
import CategoryPage from '../components/CategoryPage.vue'

const routes = [
    {
        path: '/checkout',
        component: StoreCheckout,
        name: 'store.checkout',
    },
    {
        path: '/',
        component: HomePage,
        name: 'store.index',
    },
    {
        path: '/product',
        component: ProductPage,
        name: 'store.productdetails'
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
    }
];
export default routes;