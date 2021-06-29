import cssVars from 'css-vars-ponyfill';

export default {
  namespaced: true,
  state: {
    primary: 'green',
    danger: 'white'
  },
  mutations: {
    UPDATE_THEME(state, payload) {
      const variables = {};
      Object.assign(state, payload);
      Object.keys(state).forEach(key => {
        variables[`--${key}`] = state[key];
      });
      cssVars({
        variables
      });
    }
  },
  actions: {
    changeTheme({ commit }, theme = {}) {
      commit('UPDATE_THEME', theme);
    }
  }
};
