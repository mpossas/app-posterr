<template>
  <Modal
    v-model="show"
    name="QuoteModal"
    classes="modal-container"
    content-class="modal-content"
    :click-to-close="true"
    @beforeOpen="getParams"
  >
    <i class="fa-solid fa-xmark" @click="show = false"></i>
    <Draft :originalPost="originalPost" />
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import Draft from '~/components/Draft.vue'
import { getPost } from '~/services/posts'

const show = ref(false)
const originalPost = ref({})

function getParams (event) {
  const { originalPostId } = event.ref.params.value
  getPost(originalPostId).then(response => {
    originalPost.value = response
  })
}
</script>

<style lang="scss" scoped>
:deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
:deep(.modal-content) {
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  width: 598px;
  border: 1px solid $pstr-dark-gray;
  border-radius: 0.25rem;
  background-color: $pstr-black;

  @media (prefers-color-scheme: light) {
    border-color: white;
    background-color: white;
  }
}

i {
  margin: 16px 0 20px 16px;

  &:hover {
    color: $pstr-red;
  }
}
</style>
