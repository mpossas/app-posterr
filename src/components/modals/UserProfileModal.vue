<template>
  <Modal name="UserProfileModal">
    <template #header>
      <div class="header">
        <span>{{ user?.username }}</span>
        <span class="pale-blue">{{ totalPosts }} Posts</span>
      </div>
    </template>
    <template #content="{params}">
      <div class="profile-container">
        <div class="user-info">
          <span class="pale-blue">
            @{{ getUser(params) }}
            <span v-if="currentUserFollows" class="following">Following</span>
          </span>
          <div v-if="shouldShowButtons">
            <Loading v-if="loading" />
            <div v-else>
              <button v-if="currentUserFollows" class="unfollow-btn" @click="unfollow(params.id)">Unfollow</button>
              <button v-else @click="follow(params.id)">Follow</button>
            </div>
          </div>
        </div>
        <span class="date-joined pale-blue">
          <i class="fa-solid fa-calendar-days"></i>
          Joined {{ dateJoined }}
        </span>
        <div class="social">
          <span>{{ following }} <span class="pale-blue">Following</span></span>
          <span>{{ followers }} <span class="pale-blue">Followers</span></span>
        </div>
      </div>
      <Feed :posts="posts" />
    </template>
  </Modal>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import {
  getCurrentUser,
  getUserFollowers,
  followUser,
  unfollowUser,
} from '~/services/users'
import { getTotalUserPosts, getUserPosts } from '~/services/posts'
import Modal from './Modal.vue'
import Loading from '~/components/Loading.vue'
import Feed from '~/components/Feed.vue'
import Draft from '~/components/Draft.vue'

const user = ref(null)
const currentUser = ref({})
const followers = ref(0)
const totalPosts = ref(0)
const loading = ref(false)
const posts = ref([])

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

const shouldShowButtons = computed(() => {
  return currentUser.value?.id !== user.value?.id
})

function getUser (params) {
  user.value = params
  return params.username
}

function getCurrentUserData () {
  getCurrentUser().then(response => {
    currentUser.value = response
  })
}

function getFollowers (id) {
  getUserFollowers(id).then(response => {
    followers.value = response
  })
}

function updateUserData (userId) {
  if (userId) {
    getFollowers(userId)
  }
  getCurrentUserData()
}

function socialAction (action, userId) {
  loading.value = true
  const actions = {
    'follow': () => followUser(userId),
    'unfollow': () => unfollowUser(userId)
  }
  actions[action]().then(() => {
    updateUserData(userId)
    loading.value = false
  })
}

function unfollow (userId) {
  socialAction('unfollow', userId)
}

function follow (userId) {
  socialAction('follow', userId)
}

watch(user, ({ id }) => {
  if (id) {
    getFollowers(id)
    getTotalUserPosts(id).then(response => {
      totalPosts.value = response
    })
    getUserPosts(id).then(response => {
      posts.value = response
    })
  }
})

getCurrentUserData()
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  span {
    margin-bottom: 0.25rem;
  }
  .pale-blue {
    font-size: 0.75rem;
  }
}
.profile-container {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem 1rem;

  @include border-bottom;
}
.user-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 42px;
  margin-bottom: 0.5rem;
}
.pale-blue {
  color: $pstr-pale-blue;
}
.following {
  padding: 0.25rem;
  font-size: 0.75rem;
  color: #818d9a;
  border: 1px solid #242c37;
  border-radius: 0.5rem;
  background-color: #242c37;

  @media (prefers-color-scheme: light) {
    color: #242c37;
    border-color: #ecf0f1;
    background-color: #ecf0f1;
  }
}
button {
  padding: 0.25rem 0.5rem;
  color: $pstr-blue;
  border: 1px solid $pstr-blue;
  border-radius: 1.25rem;
  background-color: $pstr-black;
  cursor: pointer;

  @media (prefers-color-scheme: light) {
    background-color: white;
  }
}
.unfollow-btn {
  color: $pstr-red;
  border-color: $pstr-red;
}
.date-joined {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
i {
  font-size: 1rem;
  margin-right: 0.25rem;
}
.social span {
  margin-right: 0.75rem;

  &:last-child {
    margin-right: 0;
  }
}
.draft-container {
  padding-top: 1rem;
  margin-bottom: 0;
}
</style>
