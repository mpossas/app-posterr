<template>
  <div class="draft-container">
    <textarea
      v-model="draft"
      maxlength="777"
      class="draft-text"
      placeholder="What's on your mind?"
    >
    </textarea>
    <div class="draft-actions">
      <span
        v-if="charCount"
        class="char-count"
        :class="{ 'char-count--danger': maxCharCount }"
      >
        {{ charCount }} / 777
      </span>
      <button class="pstr-btn">Post</button>
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
</style>
