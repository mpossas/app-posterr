<template>
  <h1>Home</h1>
  <Draft />
  <div id="nav">
    <router-link to="/">All</router-link>
    <router-link to="/following">Following</router-link>
  </div>
  <router-view />
</template>

<script setup>
import Draft from './components/Draft.vue'
</script>

<style lang="scss" scoped>
h1 {
  padding-left: 20px;
  font-size: 22px;
}

#nav {
  margin: 0 20px;
}

a {
  color: white;
  text-decoration: none;
  margin-right: 10px;

  @media (prefers-color-scheme: light) {
    color: $pstr-black;
  }
}
</style>

<style lang="scss" src="~/assets/scss/posterr.scss" />
