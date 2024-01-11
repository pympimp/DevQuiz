import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import store from './store.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './assets/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
// import VueResponsiveImage from 'vue-responsive-image'

library.add(faXmark,faCheck)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(store)
app.use('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
