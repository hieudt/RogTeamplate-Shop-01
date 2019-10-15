import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie'
import getters from './getters';

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)
// Auto require module file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const index = new Vuex.Store({
    modules,
    getters,
    state: {

    },
    plugins: [createPersistedState({
        storage: {
            getItem: key => Cookies.get(key),
            setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: false }),
            removeItem: key => Cookies.remove(key)
        }
    })],
});

export default index;