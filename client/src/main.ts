import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import axios from 'axios';

import './index.css'

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch('logout');
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

const app = createApp(App);
app.use(store);
app.use(router)
app.mount('#app');
