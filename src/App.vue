<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <TitleBar v-if="isTauri()" />
    
    <div class="flex flex-col flex-grow w-full h-full overflow-hidden sm:flex-row">
      <div class="flex-grow-0 flex-shrink hidden w-1/3 md:inline-flex sm:w-1/3 md:w-40 bg-neutral text-neutral-content md:visible">
        <div class="sticky top-0 p-4 rounded-xl">
          <nav class="h-full ">
            <div class="pb-5 lg:flex">
              <span class="text-2xl font-bold">
                Orpheus
              </span>
            </div> 
            <span class="w-full text-lg font-bold">My Library</span>
            <ul class="pl-5">
              <li
                class="cursor-pointer s-item hover:text-primary"
                @click="goTo(&quot;ArtistList&quot;)"
              >
                Artists
              </li>
              <li
                class="cursor-pointer s-item hover:text-primary"
                @click="goTo(&quot;AlbumDetails&quot;)"
              >
                Albums
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div class="flex flex-col justify-between w-full">
        <header>
          <MenuBar />
        </header>
        <main
          role="main"
          class="w-full h-full overflow-y-scroll scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-500 hover:scrollbar-thumb-green-700 "
        >
          <router-view />
        </main>
      </div>
    </div>
    <footer class="mt-auto text-center">
      <Player />
    </footer>
  </div>
</template>

<script>
import Player from "./components/Player/Player.vue"
import MenuBar from "./components/Main/MenuBar.vue"
import { invoke } from '@tauri-apps/api/tauri'
import TitleBar from "./components/Main/TitleBar.vue"
export default {
  name: 'App',
  components: {
    Player,
    TitleBar,
    MenuBar
  },
  data() {
    return {
      isOpen: true
    }
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  mounted: function (){
    // With the Tauri global script:
    document.addEventListener('DOMContentLoaded', () => {

      // This will wait for the window to load, but you could
      // run this function on whatever trigger you want
      if(this.isTauri()){
        this.loaded()
      }
    })
  },  
  methods: {
    loaded(){
      console.log('Splash removed')
      invoke('close_splashscreen')
    },
    goTo(p) {
      console.log(p)
      this.$router.push({path: `/${p}`})
    },
    open(){
      if(this.isOpen){
        this.isOpen = false
        console.log('Got close')
 
      } else {
        console.log('Got open')
        this.isOpen = true
      }
    },
    isTauri(){
      if(window.__TAURI__){
        console.log('Tauri')
        return true
      } return false
    }
  }
}
</script>

<style>

:root {
  --slider-connect-bg: hsl(var(--p));
  --slider-handle-ring-color: hsl(var(--af));
  --slider-handle-bg: hsl(var(--pf));
  --slider-bg: hsl(var(--b3));
  --slider-handle-width: 12px;
  --slider-handle-height: 12px;
  --slider-height: 4px;
  --slider-handle-ring-width: 3px;
  --slider-tooltip-radius: 3px;

}

</style>
