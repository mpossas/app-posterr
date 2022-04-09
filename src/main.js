import { createApp } from 'vue'
import App from './App.vue'
import router from '~/router'
import { vfmPlugin } from 'vue-final-modal'
import { initData } from '~/server/data'

initData()
createApp(App)
.use(router)
.use(vfmPlugin({
  componentName: 'Modal'
}))
.mount('#app')
