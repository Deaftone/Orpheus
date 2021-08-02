<template>  
  <main class="flex h-screen">
    <div class="w-56 h-screen overflow-hidden bg-gray-500">
      <header class="py-5 text-2xl font-bold text-center bg-gray-900">
        <h1
          class="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-blue-300 to-pink-900"
          @click="goTo(&quot;&quot;)"
        >
          Orpheus
        </h1> 
      </header>
      <nav class="h-full p-4 pl-4 bg-gray-900">
        <a class="text-xl font-bold">My Library</a>
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
    <div
      class="flex flex-col justify-between w-full bg-gray-00"
      style="padding-bottom:4.5rem"
    >
      <header class="p-2 text-center bg-gray-900">
        <div class="flex float-right">
          <SearchBox />
        </div>
        Content Header
      </header>
      <section class="h-full overflow-y-scroll">
        <router-view />
      </section>
    </div>
    <footer class="absolute bottom-0 w-full p-2 mt-auto text-center bg-gray-900">
      <Player />
    </footer>
  </main>
</template>

<script>
import Player from "./components/player/index.vue"
import SearchBox from "./components/SearchBox.vue"

export default {
  name: 'App',
  components: {
    Player,
    SearchBox
  },
  data() {
    return {
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
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
}

.s-item:hover {
  color: rgba(244, 114, 182)
}

:root {
  --slider-connect-bg: rgb(241, 78, 162);
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
