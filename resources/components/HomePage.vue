<template>
    <div>
        <hero-sec></hero-sec>
        <feature></feature>
        <lastest-product></lastest-product>
        <product-filter></product-filter>
        <banner></banner>
    </div>
</template>

<script>
    import FrontHeader from '../components/layouts/Header.vue'
    import HeroSec from '../components/layouts/Hero.vue'
    import Feature from '../components/layouts/Feature.vue'
    import LastestProduct from '../components/layouts/Lastest.vue'
    import ProductFilter from '../components/layouts/ProductFilter.vue'
    import Banner from '../components/layouts/Banner.vue'
    import FrontFooter from '../components/layouts/Footer.vue'

    export default {
        components: {
            FrontHeader,
            HeroSec,
            Feature,
            LastestProduct,
            ProductFilter,
            Banner,
            FrontFooter
        }
    }
</script>