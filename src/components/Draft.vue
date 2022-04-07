<template>
  <div class="draft-container">
    <textarea
      v-model="draft"
      maxlength="777"
      class="draft-text"
      placeholder="What's on your mind?"
    ></textarea>
    <div class="draft-actions">
      <span
        v-if="charCount"
        class="char-count"
        :class="{ 'char-count--danger': maxCharCount }"
      >
        {{ charCount }} / 777
      </span>
      <button>Post</button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const draft = ref('')

const charCount = computed(() => {
  return draft.value.length
})

const maxCharCount = computed(() => {
  return charCount.value === 777
})
</script>

<style lang="scss" scoped>
.draft {
  &-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 10px;
  }
  &-text {
    width: 94%;
    font-size: 18px;
    margin-bottom: 10px;
    padding: 10px;
    color: white;
    background-color: #161d26;
    border: none;

    @media (prefers-color-scheme: light) {
      color: #161d26;
      background-color: white;
    }

    @media (min-width: 768px) {
      width: 96%;
    }
  }
  &-actions {
    display: flex;
    align-items: center;
  }
}

.char-count {
  border: 1px solid #42b983;
  width: fit-content;
  border-radius: 20px;
  padding: 5px 10px;
  color: #42b983;
  margin-right: 10px;

  &--danger {
    color: #e4352f;
    border-color: #e4352f;
  }
}
</style>
