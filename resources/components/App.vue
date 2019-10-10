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
        <notifications group="foo" position="top right" classes="vue-notif-custom"/>
    </div>
</template>
<style lang="scss">
  .vue-notif-custom {
    padding: 10px;
    margin: 20px 5px 5px;

    font-size: 20px;

    color: #ffffff;
    background: #44A4FC;
    border-left: 5px solid #187FE7;

    &.warn {
      background: #ffb648;
      border-left-color: #f48a06;
    }

    &.error {
      background: #E54D42;
      border-left-color: #B82E24;
    }

    &.success {
      background: #68CD86;
      border-left-color: #42A85F;
    }
  }
</style>
<script>
    import FrontHeader from '../components/layouts/Header.vue'
    import HomePage from '../components/HomePage.vue'
    import FrontFooter from '../components/layouts/Footer.vue'

    export default {
        components: {
            FrontHeader,
            FrontFooter
        },
        methods: {
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