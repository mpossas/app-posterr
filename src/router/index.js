import { createRouter, createWebHistory } from 'vue-router'
import Home from '~/pages/Home.vue'
import NotFound from '~/pages/NotFound.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/all', component: Home },
  { path: '/following', component: () => import('~/pages/Following.vue') },
  { path: '/:pathMatch(.*)*', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
