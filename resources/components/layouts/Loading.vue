<template>
    <transition name="fade">
        <div class="busy-mask" v-show="isLoading">
            <div class="busy-dialog">
                <div v-for="i in 4" :key=i :style="{animationDelay: (i*250)+'ms'}"></div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: 'loading',
        data () {
            return {
                delay: 300,
                timer: 30000
            }
        },
        computed: {
            ...mapGetters({
                isLoading : 'user/isLoading'
            })
        },
        methods: {
        },
    }
</script>

<style scoped>
    .busy-mask {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.8);
        transition: all 1s ease-out;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .busy-dialog {
        width: 120px;
        height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    .busy-dialog > div {
        width: 12px;
        height: 12px;
        background: #999;
        border-radius: 3px;
        right: 10px;
        animation: circleKey 1s linear infinite;
        margin: 5px;
    }
    @keyframes circleKey {
        0% {
            background: #888;
            transform: scale(1);
        }
        50% {
            background: #f3f3f3;
            transform: scale(1.3);
        }
        100% {
            background: #888;
            transform: scale(1);
        }
    }
    .fade-enter-active, .fade-enter-active .busy-dialog,
    .fade-leave-active, .fade-leave-active .busy-dialog {
        transition: all 0.2s ease-out;
    }
    .fade-enter {
        opacity: 0;
    }
    .fade-enter .busy-dialog {
        transform: scale(0.9);
    }
    .fade-leave-to {
        opacity: 0;
    }
    .fade-leave-to .busy-dialog {
        transform: scale(0.9);
    }
</style>