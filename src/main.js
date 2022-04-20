import { createApp } from 'vue'

import './index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowLeft, faArrowRight, faCompactDisc, faFastBackward, faFastForward, faHome, faMicrophoneAlt, faPause, faPlay, faWindowClose, faWindowMaximize, faWindowMinimize } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
library.add(faHome)
library.add(faPlay)
library.add(faWindowMinimize)
library.add(faWindowClose)
library.add(faWindowMaximize)
library.add(faFastBackward)
library.add(faArrowLeft)
library.add(faArrowRight)
library.add(faFastForward)
library.add(faPause)
library.add(faCompactDisc)
library.add(faMicrophoneAlt)
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.mount('#app')
