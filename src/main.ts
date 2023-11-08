import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import './assets/sass/app.scss'
import i18n from './plugins/i18n'
import { createPinia } from 'pinia'
import PrimeVue from './plugins/prime'
import 'primevue/resources/themes/saga-blue/theme.css'
import './services/firebase'
const pinia = createPinia()
const app = createApp(App)

app.use(PrimeVue)
app.use(router)
app.use(pinia)
app.use(i18n)
app.mount('#app')
