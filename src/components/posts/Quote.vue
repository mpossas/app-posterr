<template>
  <span class="username">
    @{{ author }}
  </span>
  <span class="content">
    {{ comment }}
  </span>
  <div :class="{ 'post-container': post.author }">
    <Post :post="originalPost" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getPost } from '~/services/posts'
import Post from './Post.vue'

const props = defineProps({
  post: Object
})

const { author, comment, originalPostId } = props.post

const originalPost = ref({})

getPost(originalPostId).then(response => {
  originalPost.value = response
})
</script>

<style lang="scss" scoped>
div {
  box-sizing: border-box;
  width: 100%;
}

@include post-container
</style>
