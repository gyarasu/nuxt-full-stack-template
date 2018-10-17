<template>
  <div class="secret">
    <h1>Super secret page</h1>
    <router-link to="/">Back to the home page</router-link>
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
  methods: {
    ...mapActions(['logout']),
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
</style>
