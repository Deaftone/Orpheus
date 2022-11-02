import { createApp } from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'

import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import { faArrowLeft, faArrowRight, faCog, faCompactDisc, faFastBackward, faFastForward, faHeart, faHome, faMicrophoneAlt, faPause, faPlay, faWindowClose, faWindowMaximize, faWindowMinimize } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createPinia } from 'pinia'
import App from './App.vue'
import './index.css'
import router from './router'
import DeaftoneConnector from './services/deaftoneApi'
import Player from './services/player'
import devtools from '@vue/devtools'
import SettingsManager from './services/settings'
const app = createApp(App)

if (process.env.NODE_ENV === 'development') {
  devtools.connect('http://localhost', 8098)
}

app.use(createPinia())
app.provide('$deaftone', new DeaftoneConnector())
app.provide('$player', new Player())
app.provide('$settings', new SettingsManager())
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
library.add(faHeart)
library.add(farHeart)
library.add(faCog)
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.mount('#app')
