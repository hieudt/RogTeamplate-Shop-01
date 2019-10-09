<template>
    <div>
        <!-- Page Preloder -->
        <div id="preloder">
            <div class="loader"></div>
        </div>
        <front-header></front-header>
        <transition name="router-anim">
            <router-view></router-view>
        </transition>
        <front-footer></front-footer>
    </div>
</template>

<script>
    import FrontHeader from '../components/layouts/Header.vue'
    import HomePage from '../components/HomePage.vue'
    import FrontFooter from '../components/layouts/Footer.vue'

    export default {
        components: {
            FrontHeader,
            FrontFooter
        }
    }
</script>
<style>
.router-anim-enter-active {
  animation: coming .5s;
  animation-delay: .5s;
  opacity: 0;
}
.router-anim-leave-active {
  animation: going .5s;
}

@keyframes going {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50px);
    opacity: 0;
  }
}
@keyframes coming {
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>