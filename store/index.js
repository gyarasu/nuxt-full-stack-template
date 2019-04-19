export const state = () => ({
  authUser: null,
});

export const actions = {
  async nuxtServerInit({ commit }) {
    // get auth info from session
    const options = {
      method: 'GET',
      url: '/api/auth/info',
    };

    const res = await this.$axios(options);

    if (res.data.authUser) {
      commit('setUser', res.data.authUser);
    } else {
      commit('setUser', null);
    }
  },

  async login({ commit }, { email, password }) {
    const options = {
      method: 'POST',
      url: '/api/auth/login',
      data: {
        email,
        password,
      },
    };

    const res = await this.$axios(options);

    if (res.status === 200) {
      commit('setUser', res.data.authUser);
      window.location.href = '/secret';
    }
  },

  async logout({ commit }) {
    const options = {
      method: 'POST',
      url: '/api/auth/logout',
    };

    const res = await this.$axios(options);

    if (res.status === 200) {
      commit('setUser', null);
      window.location.href = '/';
    }
  },
};

export const getters = {};

export const mutations = {
  setUser(state, user) {
    state.authUser = user;
  },
};
