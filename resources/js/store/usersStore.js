import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import axios from 'axios';
import {RESOURCE_USER} from '../api';
import routes from '../routes';
import { resolve, reject } from 'q';

Vue.use(Vuex)

const router = new VueRouter({
    routes,
});

const usersStore = new Vuex.Store({
    state: {
        users: [],
        user: {},
    },
    mutations: {
        FETCH(state, users) {
            state.users = users;
        },
        FETCH_ONE(state, user) {
            state.user = user;
        },
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
        addUser({}, user) {
            return new Promise((resolve, reject) => {
                axios.post(`${RESOURCE_USER}`, {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    repassword: user.repassword
                })
                .then(function (response){
                    Vue.notify({
                        group: 'foo',
                        type: 'success',
                        text: 'Account register success fully'
                    })
                    resolve(response)
                })
                .catch(function (data) {
                    let errs = data.response.data.errors;
                    for (var el in errs) {
                        console.log(errs[el]);
                        Vue.notify({
                            group: 'foo',
                            type: 'error',
                            title: el,
                            text: errs[el]
                        })
                    }
                    reject(data)
                })
            })
        }
    }
});

export default usersStore;