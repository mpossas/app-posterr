<template>
  <div>
    <div v-for="post in props.posts" :key="post.id" class="post">
      <Post v-if="isPost(post.type)" :post="post" showActions />
      <Repost v-else-if="isRepost(post.type)" :post="post" />
      <Quote v-else-if="isQuote(post.type)" :post="post" />
    </div>
  </div>
</template>

<script setup>
import Post from './posts/Post.vue'
import Repost from './posts/Repost.vue'
import Quote from './posts/Quote.vue'

const props = defineProps({
  posts: Array
})

function isPost (type) {
  return type === 'post'
}

function isRepost (type) {
  return type === 'repost'
}

function isQuote (type) {
  return type === 'quote'
}
</script>

<style lang="scss">
.post {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.25rem;

  span {
    margin-bottom: 1rem;
  }

  .username {
    color: $pstr-pale-blue;
  }

  @include border-bottom;
}
</style>
