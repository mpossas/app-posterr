<template>
  <Modal name="UserProfileModal">
    <template #content="{params}">
      <div class="profile-container">
        <span class="username">{{ params.username }}</span>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import { ref, watch } from 'vue'
import Modal from './Modal.vue'
import { getUser } from '~/services/users'
</script>

<style lang="scss" scoped>
.profile-container {
  padding: 16px;
}
.username {
  color: $pstr-pale-blue;
}
</style>
