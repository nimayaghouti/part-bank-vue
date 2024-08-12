import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import GlobalComponents from './plugins/global-components'
import router from './router/index.js'

const app = createApp(App)

app.use(createPinia())
app.use(GlobalComponents)
app.use(router)

app.mount('#app')
