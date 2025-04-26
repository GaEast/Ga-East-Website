import { url } from '@/functions/endpoint';
import router from '@/router';
import axios from 'axios';
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

function fetchAuthToken(username: string, password: string) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/admin/auth/login`, {
        username: username,
        password: password,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

interface RootState {
  isLoggedIn: boolean | null;
  token: string | null;
  user: {
    username: string | null;
  };
  successMessage: string;
  errorMessage: string;
  numberOfPosts: number;
  numberOfDocuments: number;
}

const store = createStore<RootState>({
  state: {
    isLoggedIn: null,
    token: null,
    user: {
      username: localStorage.getItem('username') || null, // Restore username from local storage
    },
    successMessage: '',
    errorMessage: '',
    numberOfPosts: 0,
    numberOfDocuments: 0,
  },
  mutations: {
    login(state, { token, username }) {
      state.isLoggedIn = true;
      state.token = token;
      state.user.username = username;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.user.username = null; // Clear username
    },
    setUser(state, username) {
      state.user.username = username;
    },
  },
  actions: {
    login({ commit }, { username, password }: { username: string; password: string }) {
      fetchAuthToken(username, password)
        .then((tokenData) => {
          const { token }: any = tokenData;
          commit('login', { token, username });
          commit('setUser', username); // Store username in the store
          localStorage.setItem('username', username); // Store username in local storage
          this.state.successMessage = 'Login Successful';
          this.state.isLoggedIn = true;
          setTimeout(() => {
            router.push('/admin/dashboard');
          }, 2000);
        })
        .catch((error) => {
          this.state.isLoggedIn = false;
          this.state.errorMessage = error.message;
          console.log(this.state.errorMessage, 'error');
        });
    },
    logout({ commit }) {
      commit('logout');
      localStorage.removeItem('username'); // Clear username from local storage
      localStorage.clear(); // Clear all local storage if needed
    },
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    username: (state) => state.user.username,
    success: (state) => state.successMessage,
    error: (state) => state.errorMessage,
  },
  plugins: [
    createPersistedState({
      key: 'my-app',
      paths: ['isLoggedIn', 'token'], // Persist only specific parts of the state
    }),
  ],
});

export default store;
