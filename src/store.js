// store.js
import { createStore } from 'vue';

export default createStore({
  state: {
    darkTheme: false,
  },
  mutations: {
    toggleTheme(state) {
      state.darkTheme = !state.darkTheme;
      localStorage.setItem('darkTheme', state.darkTheme);
    },
    initializeTheme(state) {
      const savedTheme = localStorage.getItem('darkTheme');
      state.darkTheme = savedTheme === 'true';
    },
  },
  actions: {
    // You can add actions if needed
  },
  modules: {
    // You can add modules if needed
  },
});
