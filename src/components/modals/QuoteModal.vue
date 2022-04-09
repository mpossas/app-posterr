<template>
  <Modal name="QuoteModal">
    <template #content="{params}">
      <Draft :originalPost="params" />
    </template>
  </Modal>
</template>

<script setup>
import Modal from  './Modal.vue'
import Draft from '~/components/Draft.vue'
</script>
