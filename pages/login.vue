<template>
  <div class="login-form">
    <h2>Login Form</h2>
    <div class="login-inner">
      <label for="email">Email: </label>
      <input type="text" id="email" v-model="email" />
    </div>
    <div class="login-inner">
      <label for="password">Password: </label>
      <input type="password" id="password" v-model="password">
    </div>
    <div class="links">
      <a
        href="#"
        v-on:click="login({ email, password })"
        class="button--green">Login</a>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions(['login']),
  },
};
</script>

<style scoped>
.login-form {
  width: 100%;
  padding: 40px;
}

.login-inner {
  text-align: left;
  margin: 20px;
  width: 100%;
}
</style>
