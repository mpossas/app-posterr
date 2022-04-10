<template>
  <span
    class="username"
    tabindex="0"
    @click="openUserProfile()"
    @keyup.enter="openUserProfile()"
  >
    @{{ props.author }}
  </span>
</template>

<script setup>
import { inject } from 'vue'

const props = defineProps({
  author: String,
  authorId: Number
})

const $vfm = inject('$vfm')

function openUserProfile () {
  $vfm.show('UserProfileModal', { id: props.authorId })
}
</script>

<style lang="scss" scoped>
.username {
  margin-bottom: 1rem;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>
