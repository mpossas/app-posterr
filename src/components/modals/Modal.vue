<template>
  <vue-final-modal
    v-model="show"
    :name="props.name"
    classes="modal-container"
    content-class="modal-content"
    click-to-close
    focus-trap
    @beforeOpen="getParams"
  >
    <div class="header">
      <i class="fa-solid fa-xmark" @click="show = false"></i>
      <slot name="header" />
    </div>
    <slot name="content" :params="params" />
  </vue-final-modal>
</template>

<script setup>
import { ref } from 'vue'
import { getUser } from '~/services/users'
import { getPost } from '~/services/posts'

const props = defineProps({
  name: String,
})

const show = ref(false)
const params = ref({})

function getParams (event) {
  const { id } = event.ref.params.value

  const modals = {
    'UserProfileModal': userId => getUser(userId),
    'QuoteModal': postId => getPost(postId)
  }

  modals[props.name](id)
    .then(response => {
      params.value = response
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

.header  {
  display: flex;
  align-items: center;
  margin: 16px 0 0 16px;
  i {
    margin-right: 20px;
    &:hover {
      color: $pstr-red;
    }
  }
}
</style>
