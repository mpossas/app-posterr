<template>
  <Modal name="UserProfileModal">
    <template #content="{params}">
      <div class="profile-container">
        <span class="pale-blue">
          @{{ getUser(params) }}
          <span v-if="currentUserFollows" class="following">Following</span>
        </span>
        <span class="date-joined pale-blue">
          <i class="fa-solid fa-calendar-days"></i>
          Joined {{ dateJoined }}
        </span>
        <div class="numbers">
          <span>{{ following }} <span class="pale-blue">Following</span></span>
          <span>{{ followers }} <span class="pale-blue">Followers</span></span>
          <span>{{ totalPosts }} <span class="pale-blue">Posts</span></span>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { getCurrentUser, getUserFollowers } from '~/services/users'
import { getTotalUserPosts } from '~/services/posts'
import Modal from './Modal.vue'

const user = ref(null)
const currentUser = ref({})
const followers = ref(0)
const totalPosts = ref(0)

const currentUserFollows = computed(() => {
  return currentUser.value?.follows?.includes(user.value?.id)
})

const dateJoined = computed(() => {
  const dateOptions = {year: 'numeric', month: 'long', day: 'numeric'}
  return new Date(user.value?.id).toLocaleDateString('en-US', dateOptions)
})

const following = computed(() => {
  return user.value?.follows?.length
})

function getUser (params) {
  user.value = params
  return params.username
}

function getFollowers (id) {
  getUserFollowers(id).then(response => {
    followers.value = response
  })
}

watch(user, ({ id }) => {
  if (id) {
    getFollowers(id)
    getTotalUserPosts(id).then(response => {
      totalPosts.value = response
  })
  }
})

getCurrentUser().then(response => {
  currentUser.value = response
})
</script>

<style lang="scss" scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  padding: 16px;
}
.pale-blue {
  color: $pstr-pale-blue;
}
.following {
  padding: 4px;
  font-size: 12px;
  color: #818d9a;
  border: 1px solid #242c37;
  border-radius: 8px;
  background-color: #242c37;

  @media (prefers-color-scheme: light) {
    color: #242c37;
    border-color: #ecf0f1;
    background-color: #ecf0f1;
  }
}
.date-joined {
  display: flex;
  align-items: center;
}
span {
  margin-bottom: 16px;
}
i {
  font-size: 16px;
  margin-right: 6px;
}
.numbers span {
  margin-right: 12px;

  &:last-child {
    margin-right: 0;
  }
}
</style>
