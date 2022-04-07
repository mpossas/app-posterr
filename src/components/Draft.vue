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
    padding: 10px;
    border-bottom: 1px solid var(--pstr-dark-gray);

    @media (prefers-color-scheme: light) {
      border-color: var(--pstr-light-gray);
    }
  }
  &-text {
    width: 100%;
    box-sizing: border-box;
    font-size: 20px;
    margin-bottom: 10px;
    padding: 10px;
    color: white;
    background-color: var(--pstr-black);
    border: none;

    @media (prefers-color-scheme: light) {
      color: var(--pstr-black);
      background-color: white;
    }
  }
  &-actions {
    display: flex;
    align-items: center;
  }
}

.char-count {
  border: 2px solid var(--pstr-green);
  font-weight: bold;
  font-size: 14px;
  width: fit-content;
  border-radius: 20px;
  padding: 5px 10px;
  color: var(--pstr-green);
  margin-right: 10px;

  &--danger {
    color: var(--pstr-red);
    border-color: var(--pstr-red);
  }
}
</style>
