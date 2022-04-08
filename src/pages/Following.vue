<template>
  <Loading v-if="loading" />
  <Feed v-else :posts="posts" />
</template>

<script setup>
import { ref } from 'vue'
import Feed from '~/components/Feed.vue'
import Loading from '~/components/Loading.vue'
import { getFollowedPosts } from '~/services/posts'

const posts = ref([])
const loading = ref(true)

getFollowedPosts().then(response => {
  posts.value = response
  loading.value = false
})
</script>
