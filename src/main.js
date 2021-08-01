import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import { library } from "@fortawesome/fontawesome-svg-core"
import { faPlay, faPause, faFastForward, faFastBackward } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { store } from './store'
library.add(faPlay)
library.add(faFastBackward)
library.add(faFastForward)
library.add(faPause)
createApp(App).use(store).use(router).component("font-awesome-icon", FontAwesomeIcon).mount('#app')
