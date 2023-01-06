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
import SettingsManager from './services/settings/index'
const app = createApp(App)

if (process.env.NODE_ENV === 'development' && window.__TAURI__) {
  devtools.connect('http://localhost', 8098)
}

app.use(createPinia())

const settings = new SettingsManager(!!window.__TAURI__)
const deaftone = new DeaftoneConnector(settings)
app.provide('$settings', settings)

app.provide('$deaftone', deaftone)
app.provide('$player', new Player(deaftone))
app.provide('$router', router)

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
