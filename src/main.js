import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import store from './store.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './assets/main.css'

// import VueResponsiveImage from 'vue-responsive-image'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(store)

app.mount('#app')
