import Vue from 'vue';
import Vuex from 'vuex';
import theme from './theme';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: false
  },
  mutations: {
    SET_IS_COLLAPSE: (state, isCollapse) => {
      state.isCollapse = isCollapse;
    }
  },
  actions: {
    toggleSideBar({ state, commit }) {
      commit('SET_IS_COLLAPSE', !state.isCollapse);
    }
  },
  modules: {
    theme
  }
});
