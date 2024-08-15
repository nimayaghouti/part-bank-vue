import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import App from './App.vue'
import GlobalComponents from './plugins/global-components'
import router from './router/index.js'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPersist)
app.use(pinia)
app.use(GlobalComponents)
app.use(router)

app.mount('#app')
