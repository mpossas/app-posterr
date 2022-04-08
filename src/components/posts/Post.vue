<template>
  <template v-if="post.author">
    <span class="username">
      @{{ post.author }}
    </span>
    <span class="content">
      {{ post.content }}
    </span>
    <div v-if="showActions" class="actions">
      <i tabindex="0" class="fas fa-retweet repost"></i>
      <i tabindex="0" class="fa-solid fa-quote-right quote"></i>
    </div>
  </template>
  <Loading v-else class="loading" />
</template>

<script setup>
import { toRef } from 'vue'
import Loading from '~/components/Loading.vue'

const props = defineProps({
  post: Object,
  showActions: Boolean
})

const post = toRef(props, 'post')
</script>

<style lang="scss" scoped>
.content {
  margin-bottom: 0;
}

.actions {
  margin-top: 16px;
}

i {
  font-size: 20px;
  cursor: pointer;
}

.repost {
  padding-right: 20px;
  &:hover {
    color: $pstr-blue;
  }
}

.quote:hover {
  color: $pstr-green;
}

.loading {
  align-self: center;
}
</style>
