<template>
  <div id="nav">
    <router-link to="/">All</router-link> |
    <router-link to="/following">Following</router-link>
  </div>
  <Draft />
  <router-view/>
</template>

<script setup>
import Draft from './components/Draft.vue' 
</script>

<style scoped>
#nav {
  margin: 10px 0;
}
</style>

<style lang="scss" src="~/assets/css/posterr.scss" />
