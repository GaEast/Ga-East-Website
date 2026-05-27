import router from '@/router';
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

interface RootState {
  isLoggedIn: boolean;
  token: string | null;
  user: {
    username: string | null;
  };
}

const store = createStore<RootState>({
  state: {
    isLoggedIn: false,
    token: null,
    user: {
      username: null,
    },
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
      state.user.username = null;
    },
  },
  actions: {
    logout({ commit }) {
      commit('logout');
      localStorage.removeItem('authToken');
      localStorage.removeItem('username');
      router.push('/login');
    },
    clearLogoutTimeout() {
      // session timeout feature is currently disabled
    },
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    username: (state) => state.user.username,
  },
  plugins: [
    createPersistedState({
      key: 'gema-admin',
      paths: ['isLoggedIn', 'token', 'user'],
    }),
  ],
});

export default store;
