import { createApp } from 'vue'
import App from './App.vue'
import router from '~/router'
import { initDatabase } from '~/data/database'

initDatabase()
createApp(App).use(router).mount('#app')
