<template>
  <Username :author="author" :authorId="authorId" />
  <span class="content">
    {{ comment }}
  </span>
  <div :class="{ 'post-container': author }">
    <Post :post="originalPost" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getPost } from '~/services/posts'
import Username from '~/components/custom/Username.vue'
import Post from './Post.vue'

const props = defineProps({
  post: Object
})

const {
  author,
  authorId,
  comment,
  originalPostId
} = props.post

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

.username {
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

@include post-container
</style>
