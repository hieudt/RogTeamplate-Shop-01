import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import axios from 'axios';
import { RESOURCE_USER } from '../api';
import routes from '../routes';
import app from '../app';
import { resolve, reject } from 'q';
import { getLocalUser } from '../helpers/auth';
import { getLoggedStatus } from '../helpers/auth';

Vue.use(Vuex)

const user = getLocalUser();
const loggedStatus = getLoggedStatus();

const router = new VueRouter({
    routes,
});

const usersStore = new Vuex.Store({
    getters: {
        locale: state => state.locale,
        loggedStatus: state => state.loggedStatus,
        user: state => state.user,
        userName: state => state.user.name,
    },
    state: {
        loggedStatus: loggedStatus,
        users: [],
        user: user,
        locale: 'en'
    },
    mutations: {
        REGISTER_SUCCESS(state, msg) {
            Vue.notify({
                group: 'foo',
                type: 'success',
                text: msg,
            })
        },
        REGISTER_FAIL(state, msg) {
            for (var el in msg) {
                console.log(msg[el]);
                Vue.notify({
                    group: 'foo',
                    type: 'error',
                    title: el,
                    text: msg[el]
                })
            }
        },
        FETCH(state, users) {
            state.users = users;
        },
        FETCH_ONE(state, user) {
            state.user = user;
        },
        LOGIN_REQUEST(state) {
            state.loggedStatus = 'loading'
        },
        LOGIN_SUCCESS(state, user) {
            Vue.notify({
                group: 'foo',
                type: 'success',
                text: 'Login successfully'
            })
            state.loggedStatus = 'success'
            state.user = Object.assign({}, user, { token: user.access_token });
            localStorage.setItem('user', JSON.stringify(state.user))
        },
        LOGIN_ERROR(state, msg) {
            let flag = true;
            for (var el in msg) {
                console.log(msg[el]);
                Vue.notify({
                    group: 'foo',
                    type: 'error',
                    title: el,
                    text: msg[el]
                })
                flag = false;
            }

            if (flag) {
                Vue.notify({
                    group: 'foo',
                    type: 'error',
                    text: 'Login fail'
                })
            }
            state.loggedStatus = 'error'
        },
        LOGOUT(state) {
            Vue.notify({
                group: 'foo',
                type: 'success',
                text: 'Logout Success'
            })
            state.loggedStatus = ''
            state.user = user
            localStorage.removeItem("user");
        },
        SET_LANG(state, payload) {
            console.log(payload);
            app.$i18n.locale = payload
        }
    },
    actions: {
        fetch({ commit }) {
            return axios.get(RESOURCE_USER)
                .then(response => commit('FETCH', response.data))
                .catch();
        },
        fetchOne({ commit }, id) {
            axios.get(`${RESOURCE_USER}/${id}/edit`)
                .then(response => commit('FETCH_ONE', response.data))
                .catch();
        },
        addUser({ commit }, user) {
            return new Promise((resolve, reject) => {
                axios.post(`${RESOURCE_USER}`, {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    repassword: user.repassword
                })
                    .then(function (response) {
                        commit('REGISTER_SUCCESS', 'Succs')
                        resolve(response)
                    })
                    .catch(function (data) {
                        let errs = data.response.data.errors;
                        commit('REGISTER_FAIL', errs)
                        reject(data)
                    })
            })
        },
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('LOGIN_REQUEST')
                axios.post(`${RESOURCE_USER}/auth`, {
                    email: user.email,
                    password: user.password,
                })
                    .then(function (response) {
                        commit('LOGIN_SUCCESS', response.data.user)
                        console.log(response.data.user);
                        resolve(response)
                    })
                    .catch(function (data) {
                        let errs = data.response.data.errors;
                        commit('LOGIN_ERROR', errs)
                        reject(data)
                    })
            })
        },
        logout({ commit }) {
            commit('LOGOUT')
        },
        setLang({ commit }, payload) {
            commit('SET_LANG', payload)
        }
    }
});

export default usersStore;