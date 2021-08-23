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
    <div class="h-8 navbar bg-neutral text-neutral-content">
      <div class="flex-1 hidden px-2 mx-2 lg:flex">
        <span class="text-lg font-bold">
          Orpheus
        </span>
      </div> 
      <div class="flex-1 lg:flex-none">
        <SearchBox />
      </div> 
      <div class="flex-1 lg:flex-none">
        <ThemeSwitcher />
      </div>
      <!--       <div class="flex-none">
        <button class="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-6 h-6 stroke-current"
          >             
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />             
          </svg>
        </button>
      </div> -->
    </div>

    <div class="flex flex-col flex-grow w-full overflow-hidden sm:flex-row">
      <div class="flex-grow-0 flex-shrink w-1/3 sm:w-1/3 md:w-40">
        <div class="sticky top-0 p-4 rounded-xl">
          <nav class="h-full">
            <span class="w-full text-xl font-bold">My Library</span>
            <ul style="padding-left:20px;padding-top:5px">
              <li
                class="s-item"
                @click="goTo(&quot;ArtistList&quot;)"
              >
                Artists
              </li>
              <li
                class="s-item"
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
        class="flex-grow w-full h-full overflow-auto"
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
import Player from "./components/player/index.vue"
import SearchBox from "./components/SearchBox.vue"
import ThemeSwitcher from "./components/ThemeSwitcher.vue"

export default {
  name: 'App',
  components: {
    Player,
    SearchBox,
    ThemeSwitcher
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
  methods: {
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
    }
  }
}
</script>

<style>

:root {
  --slider-connect-bg: 'rgb(241, 78, 162)';
  --slider-handle-ring-color: #3B82F630;
  --slider-handle-bg: rgb(65, 65, 65);
  --slider-bg: rgb(65, 65, 65);
  --slider-handle-width: 16px;
  --slider-handle-height: 16px;
  --slider-height: 9px;
  --slider-handle-ring-width: 3px;
  --slider-tooltip-radius: 3px;
}

</style>
