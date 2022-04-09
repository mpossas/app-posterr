<template>
  <h1>Home</h1>
  <Draft />
  <div id="nav">
    <router-link to="/">All</router-link>
    <router-link to="/following">Following</router-link>
  </div>
  <router-view />
  <QuoteModal />
</template>

<script setup>
import Draft from './components/Draft.vue'
import QuoteModal from './components/modals/QuoteModal.vue'
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

  &:hover {
    color: $pstr-blue;
  }

  @media (prefers-color-scheme: light) {
    color: $pstr-black;
  }
}
</style>

<style lang="scss" src="~/assets/scss/posterr.scss" />
