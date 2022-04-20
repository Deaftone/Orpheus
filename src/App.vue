<script>
import { invoke } from '@tauri-apps/api/tauri'
import Player from './components/Player/Player.vue'
import MenuBar from './components/Main/MenuBar.vue'
import TitleBar from './components/Main/TitleBar.vue'
import RightSidebar from './components/Main/RightSidebar.vue'
export default {
  name: 'App',
  components: {
    Player,
    TitleBar,
    MenuBar,
    RightSidebar,
  },
  data() {
    return {
      isOpen: true,
    }
  },
  computed: {
    count() {
      return this.$store.state.count
    },
  },
  mounted() {
    // With the Tauri global script:
    document.addEventListener('DOMContentLoaded', () => {
      // This will wait for the window to load, but you could
      // run this function on whatever trigger you want
      if (this.isTauri())
        this.loaded()
    })
  },
  methods: {
    loaded() {
      console.log('Splash removed')
      // invoke('close_splashscreen')
    },
    goTo(p) {
      console.log(p)
      this.$router.push({ path: `/${p}` })
    },
    open() {
      if (this.isOpen) {
        this.isOpen = false
        console.log('Got close')
      }
      else {
        console.log('Got open')
        this.isOpen = true
      }
    },
    isTauri() {
      if (window.__TAURI__) {
        console.log('Tauri')
        return true
      } return false
    },
  },
}
</script>
<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <TitleBar v-if="isTauri()" />
    <div class="flex flex-col flex-grow w-full h-full overflow-hidden sm:flex-row">
      <div class="flex-grow-0 flex-shrink hidden p-3 md:inline-flex bg-neutral md:visible">
        <div class="sticky top-0 flex rounded-xl ">
          <nav class="h-full ">
            <!--             <div class="pb-5 lg:flex">
              <span class="text-2xl font-bold">
                Orpheus
              </span>
            </div> -->
            <div
              class="relative flex items-center justify-center w-12 h-12 mx-auto mt-2 mb-2 text-green-500 transition-all duration-300 ease-linear bg-gray-400 shadow-lg cursor-pointer tooltip tooltip-right hover:bg-green-600 dark:bg-base-100 hover:text-white hover:rounded-xl rounded-3xl hover:bg-primary"
              data-tip="Home"
              @click="goTo(&quot;/&quot;)"
            >
              <font-awesome-icon
                icon="home"
                class=""
                color="gray"
              />
            </div>
            <div class="divider" />
            <div
              class="relative flex items-center justify-center w-12 h-12 mx-auto mt-2 mb-2 text-green-500 transition-all duration-300 ease-linear bg-gray-400 shadow-lg cursor-pointer tooltip tooltip-right hover:bg-green-600 dark:bg-base-100 hover:text-white hover:rounded-xl rounded-3xl hover:bg-primary"
              data-tip="Artists"
              @click="goTo(&quot;ArtistList&quot;)"
            >
              <font-awesome-icon
                icon="microphone-alt"
                class=""
                color="gray"
              />
            </div>

            <div
              data-tip="Albums"

              class="relative flex items-center justify-center w-12 h-12 mx-auto mt-2 mb-2 text-green-500 transition-all duration-300 ease-linear bg-gray-400 shadow-lg cursor-pointer tooltip tooltip-right hover:bg-green-600 dark:bg-base-100 hover:text-white hover:rounded-xl rounded-3xl hover:bg-primary"
              @click="goTo(&quot;AlbumDetails&quot;)"
            >
              <font-awesome-icon
                icon="compact-disc"
                class=""
                color="gray"
              />
            </div>
            <!--             <ul class="pl-2">
              <li
                class="cursor-pointer s-item hover:text-primary"
              >
                <font-awesome-icon
                  icon="compact-disc"
                  color="gray"
                />
                Artists
              </li>
              <li
                class="cursor-pointer s-item hover:text-primary"
                @click="goTo(&quot;AlbumDetails&quot;)"
              >
                <font-awesome-icon
                  icon="compact-disc"
                  color="gray"
                />
                Albums
              </li>
            </ul> -->
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
          <router-view v-slot="{ Component }">
            <transition name="fade">
              <component :is="Component" />
            </transition>
          </router-view>
        </main>
      </div>
      <div class="flex flex-col w-64 bg-neutral">
        <RightSidebar />
      </div>
    </div>
    <!-- If we remove the pt-1 and bg we get a weird 1 px size bug for the background image on the ArtistDetails page -->
    <footer class="text-center bg-base-200">
      <Player />
    </footer>
  </div>
</template>

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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
