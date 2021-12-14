<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <!-- <nav class="flex flex-wrap items-center justify-between p-1">
      <div class="flex items-center mr-6 text-white flex-no-shrink">
        <span class="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-300 ">Tailwind CSS</span>
      </div>
      <div class="flex-grow block w-full lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow" />
        <div>
          
        </div>
      </div>
    </nav> -->

    <TitleBar v-if="isTauri()" />

    <div
      id="menuBar"
      class="h-6 navbar bg-neutral text-neutral-content"
    >
      <div class="hidden px-2 mx-2 lg:flex">
        <span class="text-lg font-bold">
          Orpheus
        </span>
      </div> 
      <div class="flex-1 hidden px-4 mx-2 lg:flex">
        <span class="text-lg font-bold">
          <button
            class="px-4 py-2 font-bold text-gray-800 co"
            @click="$router.go(-1)"
          >
            <font-awesome-icon
              icon="arrow-left"
              color="gray"
            />
          </button>
          <button
            class="px-4 py-2 font-bold text-gray-800 co"
            @click="$router.go(1)"
          >
            <font-awesome-icon
              icon="arrow-right"
              color="gray"
            />
          </button>
        </span>
      </div> 
      <div class="flex-1 lg:flex-none">
        <SearchBox />
      </div> 
      <div class="flex-1 lg:flex-none">
        <ThemeSwitcher />
      </div>
    </div>

    <div class="flex flex-col flex-grow w-full overflow-hidden sm:flex-row ">
      <div class="flex-grow-0 flex-shrink hidden w-1/3 md:inline-flex sm:w-1/3 md:w-40 bg-neutral text-neutral-content md:visible">
        <div class="sticky top-0 p-4 rounded-xl">
          <nav class="h-full ">
            <span class="w-full text-xl font-bold">My Library</span>
            <ul style="padding-left:20px;padding-top:5px">
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
      <main
        role="main"
        class="w-full h-full overflow-auto"
      >
        <router-view />
      </main>
    </div>
    <footer class="mt-auto text-center">
      <Player />
    </footer>
  </div>
</template>

<script>
import Player from "./components/Player/index.vue"
import SearchBox from "./components/Util/SearchBox.vue"
import ThemeSwitcher from "./components/Util/ThemeSwitcher.vue"
import { invoke } from '@tauri-apps/api/tauri'
import TitleBar from "./components/Main/TitleBar.vue"
export default {
  name: 'App',
  components: {
    Player,
    SearchBox,
    ThemeSwitcher,
    TitleBar
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
  --slider-handle-width: 16px;
  --slider-handle-height: 16px;
  --slider-height: 9px;
  --slider-handle-ring-width: 3px;
  --slider-tooltip-radius: 3px;
}

</style>
