<template>
  <div
    class="draft-container"
    :class="{ 'quote-container': isQuoting }"
  >
    <textarea
      v-model="draft"
      maxlength="777"
      class="draft-text"
      :placeholder="getPlaceholder"
    >
    </textarea>
    <div v-if="isQuoting" class="post-container">
      <Post :post="originalPost" />
    </div>
    <CantPost v-if="postLimitReached" class="limit-reached" />
    <div class="draft-actions">
      <span
        v-if="charCount"
        class="char-count"
        :class="{
          'char-count--danger': charLimitReached
        }"
      >
        {{ charCount }} / 777
      </span>
      <Loading v-if="loading" />
      <button
        v-else
        class="post-btn"
        :disabled="btnDisabled"
        @click="postDraft()"
        @keyup.enter="postDraft()"
      >
        Post
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, toRef } from 'vue'
import { useRouter } from 'vue-router'
import { postMessage, quotePost } from '~/services/posts'
import Loading from '~/components/Loading.vue'
import CantPost from '~/components/custom/CantPost.vue'
import Post from '~/components/posts/Post.vue'

const props = defineProps({
  originalPost: Object
})

const router = useRouter()

const originalPost = toRef(props, 'originalPost')
const draft = ref('')
const postLimitReached = ref(false)
const loading = ref(false)

const charCount = computed(() => {
  return draft.value.length
})

const charLimitReached = computed(() => {
  return charCount.value === 777
})

const btnDisabled = computed(() => {
  return charCount.value === 0
})

const isQuoting = computed(() => {
  return !!originalPost.value
})

const getPlaceholder = computed(() => {
  return isQuoting.value ? 'Leave a comment' : `What's on your mind?`
})

function postDraft () {
  loading.value = true

  const postAction = originalPost.value
    ? quotePost(originalPost.value.id, draft.value)
    : postMessage(draft.value)

  postAction
    .then(() => {
      router.go()
    })
    .catch(() => {
      postLimitReached.value = true
      loading.value = false
    })
}
</script>

<style lang="scss" scoped>
.draft {
  &-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 1rem;
    padding-top: 0.5rem;
    margin-bottom: 1.25rem;

    @include border-bottom
  }
  &-text {
    width: 100%;
    box-sizing: border-box;
    font-size: 1.25rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    margin-bottom: 1rem;
    color: white;
    background-color: $pstr-black;
    border: none;

    &:focus {
      outline: none;
    }

    @media (prefers-color-scheme: light) {
      color: $pstr-black;
      background-color: white;
    }
  }
  &-actions {
    display: flex;
    align-items: center;
  }
}

.limit-reached {
  align-self: flex-start;
  margin-bottom: 0.5rem;
}

.post-container {
  margin-bottom: 1rem;
}

.char-count {
  border: 2px solid $pstr-green;
  font-weight: bold;
  font-size: 0.75rem;
  width: fit-content;
  border-radius: 1.25rem;
  padding: 0.25rem 0.5rem;
  color: $pstr-green;
  margin-right: 0.75rem;

  &--danger {
    color: $pstr-red;
    border-color: $pstr-red;
  }
}

.post-btn {
  width: fit-content;
  font-weight: bold;
  color: white;
  background-color: $pstr-blue;
  padding: 0.5rem 1rem;
  border: 1px solid $pstr-blue;
  border-radius: 1.25rem;
  cursor: pointer;

  &:disabled {
    background-color: #275588;
    border-color: #275588;
    color: #8b8e93;
    cursor: not-allowed;

    @media (prefers-color-scheme: light) {
      background-color: #9bc5f4;
      border-color: #9bc5f4;
      color: white;
    }
  }

  &-danger {
    background-color: $pstr-red;
    border-color: $pstr-red;
  }
}

.quote-container {
  padding: 1.5rem 1rem 1rem;
  margin: 0;
  border-bottom: none;
}

@include post-container
</style>
