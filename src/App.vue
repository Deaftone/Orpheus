<script>
import { invoke } from '@tauri-apps/api/tauri'
import Player from './components/Player/Player.vue'
import NewPlayer from './components/Player/NewPlayer.vue'

import MenuBar from './components/Main/MenuBar.vue'
import TitleBar from './components/Main/TitleBar.vue'
import RightSidebar from './components/Main/RightSidebar.vue'
import LeftSidebar from './components/Main/LeftSidebar.vue'
import {
  computed,
  onMounted
} from 'vue'
import { usePlayerStore } from './stores/player'
export default {

  components: {
    Player,
    TitleBar,
    MenuBar,
    RightSidebar,
    LeftSidebar,
    NewPlayer
  },
  setup () {
    const store = usePlayerStore()
    function loaded () {
      console.log('Splash removed')
      invoke('close_splashscreen')
    }
    function goTo (p) {
      console.log(p)
      this.$router.push({ path: `/${p}` })
    }

    function isTauri () {
      if (window.__TAURI__) {
        console.log('Tauri')
        return true
      } return false
    }
    onMounted(() => {
    // With the Tauri global script:
      document.addEventListener('DOMContentLoaded', () => {
      // This will wait for the window to load, but you could
      // run this function on whatever trigger you want
        if (isTauri()) { loaded() }
      })
    })

    return {
      loaded,
      goTo,
      isTauri
    }
  }
}
</script>

<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <TitleBar v-if="isTauri()" />
    <div class="flex flex-col flex-grow w-full h-full overflow-hidden sm:flex-row">
      <div class="flex-grow-0 flex-shrink hidden p-3 md:inline-flex bg-neutral md:visible">
        <div class="sticky top-0 flex rounded-xl ">
          <LeftSidebar />
        </div>
      </div>
      <div class="flex flex-col justify-between w-full">
        <header>
          <MenuBar />
        </header>
        <main
          role="main"
          class="flex-1 overflow-y-scroll scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-500 hover:scrollbar-thumb-green-700"
        >
          <router-view v-slot="{ Component }">
            <!--             <transition name="fade"> -->
            <component :is="Component" />
            <!--             </transition> -->
          </router-view>
        </main>
      </div>
      <div
        class="flex flex-col w-64 bg-neutral"
        v-if="false"
      >
        <RightSidebar />
      </div>
    </div>
    <!-- If we remove the pt-1 and bg we get a weird 1 px size bug for the background image on the ArtistDetails page -->
    <footer class="flex text-center bg-base-200">
<!--       <Player />
 -->      <NewPlayer />
    </footer>
  </div>
</template>

<style>
:root {
  --slider-connect-bg: hsl(var(--p));
  --slider-handle-ring-color: hsl(var(--af));
  --slider-handle-bg: hsl(var(--pf));
  --slider-bg: hsl(var(--b3));
  --slider-handle-width: 13px;
  --slider-handle-height: 13px;
  --slider-height: 8px;
  --slider-handle-ring-width: 3px;
  --slider-tooltip-radius: 3px;

}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
