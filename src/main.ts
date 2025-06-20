import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { persistCartPlugin } from './plugins/piniaPersistCart'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
persistCartPlugin()

app.use(router)

app.mount('#app')
