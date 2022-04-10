<template>
  <h1>Home</h1>
  <Draft />
  <div id="nav">
    <router-link to="/">All</router-link>
    <router-link to="/following">Following</router-link>
  </div>
  <router-view />
  <QuoteModal />
  <UserProfileModal />
</template>

<script setup>
import Draft from './components/Draft.vue'
import QuoteModal from './components/modals/QuoteModal.vue'
import UserProfileModal from './components/modals/UserProfileModal.vue'
</script>

<style lang="scss" scoped>
h1 {
  padding-left: 1.25rem;
  font-size: 1.5rem;
}

#nav {
  margin: 0 1.25rem;
}

a {
  color: white;
  text-decoration: none;
  margin-right: 0.75rem;

  &:hover {
    color: $pstr-blue;
  }

  @media (prefers-color-scheme: light) {
    color: $pstr-black;
  }
}
</style>

<style lang="scss" src="~/assets/scss/posterr.scss" />
