import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import { library } from "@fortawesome/fontawesome-svg-core"
import { faPlay, faPause, faFastForward, faCompactDisc, faMicrophoneAlt ,faFastBackward, faWindowClose, faWindowMaximize, faWindowMinimize, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { playerStore } from './stores/player'

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
createApp(App).use(playerStore).use(router).component("font-awesome-icon", FontAwesomeIcon).mount('#app')
