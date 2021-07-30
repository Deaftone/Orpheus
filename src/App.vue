<template>  
  <main class="h-screen flex">
    <div class="w-72 h-screen bg-gray-500 overflow-hidden">
      <header class="bg-gray-900 py-5 text-center text-2xl font-bold">
        <h1
          class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-blue-300 to-pink-900"
          @click="goTo(&quot;&quot;)"
        >
          Orpheus
        </h1> 
      </header>
      <nav class="bg-gray-900 h-full p-4">
        <a class="text-xl font-bold">My Library</a>
        <ul style="padding-left:20px;padding-top:5px">
          <li
            class="s-item"
            @click="goTo(&quot;test&quot;)"
          >
            Albums
          </li>
          <li
            class="s-item"
            @click="goTo(&quot;arists&quot;)"
          >
            Artists
          </li>
          <li class="s-item">
            Tracks
          </li>
          <li class="s-item">
            Tracks
          </li>
          <li class="s-item">
            Tracks
          </li>
          <li class="s-item">
            Tracks
          </li>
          <li class="s-item">
            Tracks
          </li>
          <li class="s-item">
            Tracks
          </li>
          <li class="s-item">
            Tracks
          </li>
          <li class="s-item">
            Tracks
          </li>
          <li class="s-item">
            Tracks
          </li>
          <li class="s-item">
            Tracks
          </li>
          <li class="s-item">
            Tracks
          </li>
          <li class="s-item">
            Tracks
          </li>
          <li class="s-item">
            Tracks
          </li>
          <li class="s-item">
            Tracks
          </li>
          <li class="s-item">
            Tracks
          </li>
          <li class="s-item">
            Tracks
          </li>
          <li class="s-item">
            Tracks
          </li>
          <li class="s-item">
            Tracks
          </li>
          <li class="s-item">
            Tracks
          </li>
          <li class="s-item">
            Tracks
          </li>
          <li class="s-item">
            Tracks
          </li>
          <li class="s-item">
            Tracks
          </li>
          <li class="s-item">
            Tracks
          </li>
          <li class="s-item">
            Tracks
          </li>
          <li class="s-item">
            Tracks
          </li>
          <li class="s-item">
            Tracks
          </li>
        </ul>
      </nav>
    </div>
    <div
      class="flex flex-col justify-between  overflow-hidden w-full bg-red-400"
      style="padding-bottom:4.5rem"
    >
      <header class="bg-gray-900 p-2 text-center">
        <div class="flex float-right">
          <SearchBox />
        </div>
        Content Header
      </header>
      <section class="overflow-y-scroll ">      
        <router-view />
      </section>
    </div>
    <footer class="mt-auto bg-gray-900 p-2 absolute bottom-0 w-full text-center">
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
  methods: {
    goTo(p) {
      console.log(p)
      this.$router.push({path: `/${p}`});
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
  --slider-connect-bg: rgba(244, 114, 182);
  --slider-handle-ring-color: #3B82F630;
  --slider-handle-bg: rgb(65, 65, 65);
  --slider-bg: rgb(65, 65, 65);
  --slider-handle-width: 12px;
  --slider-handle-height: 12px;
  --slider-height: 4px;
  --slider-handle-ring-width: 2px;
  --slider-tooltip-radius: 2px;
}
</style>
