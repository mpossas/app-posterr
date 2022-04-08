<template>
  <div class="draft-container">
    <textarea
      v-model="draft"
      maxlength="777"
      class="draft-text"
      placeholder="What's on your mind?"
    >
    </textarea>
    <span v-if="postLimitReached" class="limit-reached">
      You reached your daily post limit
    </span>
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
      <button
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
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { postMessage } from '~/services/posts'

const router = useRouter()

const draft = ref('')
const postLimitReached = ref(false)

const charCount = computed(() => {
  return draft.value.length
})

const charLimitReached = computed(() => {
  return charCount.value === 777
})

const btnDisabled = computed(() => {
  return charCount.value === 0
})

function postDraft () {
  postMessage(draft.value)
    .then(() => {
      router.go()
    })
    .catch(() => {
      postLimitReached.value = true
    })
}
</script>

<style lang="scss" scoped>
.draft {
  &-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 20px;
    padding-top: 10px;
    margin-bottom: 20px;

    @include border-bottom
  }
  &-text {
    width: 100%;
    box-sizing: border-box;
    font-size: 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    margin-bottom: 15px;
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
  font-size: 12px;
  color: $pstr-red;
  margin-bottom: 5px;
}

.char-count {
  border: 2px solid $pstr-green;
  font-weight: bold;
  font-size: 14px;
  width: fit-content;
  border-radius: 20px;
  padding: 5px 10px;
  color: $pstr-green;
  margin-right: 10px;

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
  padding: 10px 20px;
  border: 1px solid $pstr-blue;
  border-radius: 20px;
  cursor: pointer;

  &:disabled {
    background-color: #275588;
    border-color: #275588;
    color: #8b8e93;
    cursor: not-allowed;
  }

  &-danger {
    background-color: $pstr-red;
    border-color: $pstr-red;
  }
}
</style>
