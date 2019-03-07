<template>
  <div class="secret">
    <h1>Super secret page</h1>
    <router-link to="/">Back to the home page</router-link>
    <br />
    <span class="login-history">Latest Lgoin: {{ latestLogin }}</span>
    <div class="links">
      <a
        href="#"
        v-on:click="logout"
        class="button--grey">Logout</a>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  middleware: 'authenticated',
  mounted() {
    this.getLatestLogin();
  },
  data() {
    return {
      latestLogin: null,
    };
  },
  methods: {
    ...mapActions(['logout']),
    async getLatestLogin() {
      const options = {
        method: 'GET',
        url: '/api/users/login-history',
      };

      const res = await this.$axios(options);

      if (res.status === 200) {
        this.latestLogin = res.data.latestLogin;
      }
    },
  },
};
</script>

<style scoped>
.secret {
  padding: 40px;
}

.links {
  padding-top: 15px;
}

.login-history {
  display: inline-block;
  padding: 8px;
  margin: 24px 0px;
  background: rgba(255, 0, 0, 0.3);
}
</style>
