<template>
  <span class="username" @click="openUserProfile()">
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
  margin-bottom: 16px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>
