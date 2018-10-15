import Vuex from 'vuex';

const state = {
  authUser: null,
};

const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('setUser', req.session.authUser);
    } else {
      commit('setUser', null);
    }
  }
}

const getters = {};

const mutations = {
  setUser(state, user) {
    state.authUser = user;
  },
};

const store = () => new Vuex.Store( {
  state,
  getters,
  actions,
  mutations,
});

export default store;
