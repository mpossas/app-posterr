<template>
  <template v-if="post.author">
    <span class="username">
      @{{ post.author }}
    </span>
    <span class="content">
      {{ post.content }}
    </span>
    <CantPost v-if="postLimitReached" class="limit-reached" />
    <div v-if="enableActions" class="actions">
      <i tabindex="0" class="fas fa-retweet repost" @click="repost()"></i>
      <i tabindex="0" class="fas fa-quote-right quote" @click="quotePost()"></i>
    </div>
  </template>
  <Loading v-else class="loading" />
</template>

<script setup>
import { computed, ref, toRef, inject } from 'vue'
import { useRouter } from 'vue-router'
import { getCurrentUser } from '~/services/users'
import { repostMessage } from '~/services/posts'
import Loading from '~/components/Loading.vue'
import CantPost from './CantPost.vue'

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
  $vfm.show('QuoteModal', { originalPostId: post.value.id })
}
</script>

<style lang="scss" scoped>
.username {
  margin-bottom: 16px;
}

.content {
  margin-bottom: 0;
}

.limit-reached {
  margin-top: 8px;
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
