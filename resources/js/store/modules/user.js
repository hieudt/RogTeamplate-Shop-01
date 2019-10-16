import app from '../../app';
import axios from 'axios';
import {RESOURCE_USER} from '../../api';
import { resolve, reject } from 'q';

export default {
    namespaced: true,
    getters: {
        locale: state => state.locale,
        loggedStatus: state => state.loggedStatus,
        getUser: state => state.user,
        getToken: state =>state.token,
        getUsers: state => state.users,
        getUserShow: state => state.userShow,
    },
    state: {
        loggedStatus: false,
        users: [],
        userShow: '',
        user: '',
        locale: 'en',
        token: '',
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
            state.userShow = user
            console.log(state)
        },
        LOGIN_SUCCESS(state, payload) {
            Vue.notify({
                group: 'foo',
                type: 'success',
                text: 'Login successfully'
            })
            state.loggedStatus = true
            state.user = Object.assign({}, payload.user, { token: payload.access_token })
            state.token = payload.access_token
            console.log(payload)
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
            state.loggedStatus = false
        },
        LOGOUT(state) {
            Vue.notify({
                group: 'foo',
                type: 'success',
                text: 'Logout Success'
            })
            state.loggedStatus = false
            state.user = ''
            state.token = ''
        },
        SET_LANG(state, payload) {
            console.log(payload);
            app.$i18n.locale = payload
        }
    },
    actions: {
        fetch({ commit }, token) {
            return new Promise ((resolve, reject) => {
                axios.create({
                    headers: {
                        'Accept' : 'application/json',
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer '+token,
                    }
                })
                .get(RESOURCE_USER)
                .then(function (response) {
                    commit('FETCH', response.data)
                    resolve(response)
                })
                .catch();
            })
        },
        fetchOne({ commit }, data) {
            return new Promise ((resolve, reject) => {
                axios.create({
                    headers: {
                        'Accept' : 'application/json',
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer '+data.token,
                    }
                })
                .get(`${RESOURCE_USER}/${data.id}`)
                .then(function (response) {
                    commit('FETCH_ONE', response.data[0])
                    resolve(response)
                })
                .catch();
            })
        },
        addUser({ commit }, user) {
            return new Promise((resolve, reject) => {
                axios.post(`${RESOURCE_USER}`, {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    repassword: user.repassword
                })
                .then(function (response){
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
        login({commit}, user) {
            return new Promise((resolve, reject) => {
                axios.post(`${RESOURCE_USER}/auth`, {
                    email: user.email,
                    password: user.password,
                })
                .then(function (response){
                    commit('LOGIN_SUCCESS', response.data)
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
        logout({commit}) {
            commit('LOGOUT')
        },
        setLang({ commit }, payload) {
            commit('SET_LANG', payload)
        },
    },
}

