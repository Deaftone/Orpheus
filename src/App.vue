<template class="flex">  
   <div class="flex flex-col justify-between h-screen bg-gray-800" style="width:250px;position:fixed">
      <header class="bg-gray-800 py-4 text-left text-2xl font-bold" style="z-index:2;padding-left:20px;">
        <h1 class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-blue-300 to-pink-900" @click='goTo("")' >Orpheus</h1> 
      </header>
      <header class="bg-gray-900 py-4 w-screen" style="position:fixed;background-color:rgba(23, 23, 23)">
        HEADER
      </header>
      <div class="text-left" style="padding-left:20px;padding-top:10px">
        <a class="text-xl font-bold">My Library</a>
        <ul style="padding-left:20px;padding-top:5px">
          <li class="s-item" @click='goTo("test")' >Albums</li>
          <li class="s-item" @click='goTo("arists")'>Artists</li>
          <li class="s-item">Tracks</li>
        </ul>
      </div>
      <footer class="mt-auto bg-gray-800 py-4 w-screen">
        FOOTER
      </footer>
    </div>
    <div class="flex flex-col justify-between bg-gray-900" style="margin-left:250px;margin-top:50px;margin-bottom:50px;width:100%;">
      <div id="content" style="padding:20px">
        <router-view/>
      </div>
    </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    goTo(p) {
      console.log(p)
      this.$router.push({path: `/${p}`});
    }
  }
}
</script>

<style>
body {
  background-color: rgba(23, 23, 23);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  color: white;
  overflow:auto
}

.s-item {

}
.s-item:hover {
  color: rgba(244, 114, 182)
}
</style>
