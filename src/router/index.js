import { createRouter, createWebHistory } from 'vue-router'
import Home from '~/pages/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/all',
    name: 'All',
    component: Home
  },
  {
    path: '/following',
    name: 'Following',
    component: () => import('~/pages/Following.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
