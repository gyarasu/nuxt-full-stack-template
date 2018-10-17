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
    getLatestLogin() {
      fetch('/api/users/login-history', {
        credentials: 'same-origin',
        method: 'GET',
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.latestLogin = data.latestLogin;
      });
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
