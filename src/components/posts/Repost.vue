<template>
  <div>
    <i class="fas fa-retweet"></i>
    <span>@{{ author }} Reposted</span>
  </div>
  <Post :post="originalPost" />
</template>

<script setup>
import { ref } from 'vue'
import { getPost } from '~/services/posts'
import Post from './Post.vue'

const props = defineProps({
  post: Object
})
const { author, originalPostId } = props.post

const originalPost = ref({})

getPost(originalPostId).then(response => {
  originalPost.value = response
})
</script>

<style lang="scss" scoped>
div {
  font-size: 12px;
  color: $pstr-pale-blue;
  margin-bottom: 5px;
}

i {
  font-size: 12px;
  margin-right: 5px;
}
</style>
