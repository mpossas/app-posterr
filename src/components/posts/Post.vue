<template>
  <template v-if="post">
    <Username :author="post.author" :authorId="post.authorId" />
    <span class="content">
      {{ post.content }}
    </span>
    <CantPost v-if="postLimitReached" class="limit-reached" />
    <div v-if="enableActions" class="actions">
      <i tabindex="0" class="fas fa-retweet repost" @click="repost()"></i>
      <i tabindex="0" class="fas fa-quote-right quote" @click="quotePost()"></i>
    </div>
  </template>
</template>

<script setup>
import { computed, ref, toRef, inject } from 'vue'
import { useRouter } from 'vue-router'
import { getCurrentUser } from '~/services/users'
import { repostMessage } from '~/services/posts'
import Username from '~/components/custom/Username.vue'
import CantPost from '~/components/custom/CantPost.vue'

const props = defineProps({
  post: Object,
  showActions: Boolean
})

const router = useRouter()
const $vfm = inject('$vfm')

const post = toRef(props, 'post')
const postLimitReached = ref(false)
const currentUserId = ref(0)

getCurrentUser().then(user => {
  currentUserId.value = user.id
})

const enableActions = computed(() => {
  const currentUserIsAuthor = currentUserId.value === post.value.authorId
  return props.showActions && !currentUserIsAuthor
})

function repost () {
  repostMessage(post.value.id)
    .then(() => {
      router.go()
    })
    .catch(() => {
      postLimitReached.value = true
    })
}

function quotePost () {
  $vfm.show('QuoteModal', { id: post.value.id })
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

.content {
  margin-bottom: 0;
}

.limit-reached {
  margin-top: 0.5rem;
  margin-bottom: 0;
}

.actions {
  margin-top: 1rem;
}

i {
  font-size: 1.25rem;
  cursor: pointer;
}

.repost {
  padding-right: 1.25rem;
  &:hover {
    color: $pstr-blue;
  }
}

.quote:hover {
  color: $pstr-green;
}
</style>
