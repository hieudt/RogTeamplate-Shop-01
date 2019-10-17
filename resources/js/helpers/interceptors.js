import axios from 'axios';
import index from '@/store'

const http = axios.create ({
    timeout: 1000,
});
  

http.interceptors.request.use(function(config) {
    const token = index.getters['user/getToken'];
    if(token) {
        config.headers['Authorization'] = `Bearer ${token}`
        config.headers['Accept'] = 'application/json'
    }
    return config;
}, function(err) {
    return Promise.reject(err);
});

export default http;