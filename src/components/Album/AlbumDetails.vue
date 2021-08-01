<template>  
  <div class="grid w-full grid-cols-1 gap-5 pt-10 pb-10 bg-gradient-to-b from-gray-800 to-gray-900">
    <div
      ref="albumInfo"
      class="flex pl-40 pr-40"
    >
      <img
        class="shadow-lg"
        :src="cover"
      >
      <div class="flex flex-col justify-center w-screen pl-10 m-auto">
        <span class="text-6xl font-bold">{{ title }}</span>
        <span class="pt-5 text-3xl font-bold text-pink-400">{{ artist }}</span>
      </div>
    </div>
    <div
      ref="sticky"
      style="height:0.1px"
    />
    <div
      ref="albumBar"
      class="sticky top-0 w-full p-1 pl-40 pr-40 -mt-5 text-sm transition"
    >
      <a>#</a>
      <div class="float-right">
        <a>Length</a>
      </div>
      <div class="float-right pr-5">
        <a>Type</a>
      </div>
      <a class="pl-7">Title</a>
    </div>
    <div class="grid w-full grid-cols-1 gap-5 pl-40 pr-40">
      <div
        v-for="song in songs"
        :id="song.id"
        :key="song.number"
        class="flex justify-center p-1 text-lg rounded-lg bg-gradient-to-r from-gray-600 to-gray-700 "
        @click="playTrack(song.title, song.id)"
      >
        <div class="w-full p-2">
          <div class="float-left pr-3">
            <a>{{ song.number }}</a>
          </div>
          <div class="float-left">
            <a>{{ song.title }}</a>
          </div>
          <div class="float-right ">
            <a>{{ song.length }}</a>
          </div>
          <div class="float-right pl-1 pr-1 mr-5 text-sm bg-gray-800 border-4 border-pink-500 border-solid rounded-lg">
            <a>{{ song.type }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiAxios from '../../utils/apiAxios'
import axios from '../../utils/apiAxios'

export default {
  name: 'AlbumDetails',
  props: {id: {type: String, required: true}},
  data() {
    return {
      observer: null,
      title: '',
      artist: '',
      songs: []
    }
  },
  computed: {
    nowPlaying () {
      return this.$store.state.nowPlaying
    }
  },
  watch: {
    nowPlaying (newPlaying, oldPlaying ) {
      let oldP
      if(oldPlaying) {
        oldP = document.getElementById(oldPlaying.id) 
      }

      const newP = document.getElementById(newPlaying.id)

      if(oldP) {
        oldP.classList.remove("border-solid", "border-4", "border-pink-500")
      }
      newP.classList.add("border-solid", "border-4", "border-pink-500")
    }
  }, 
  created() {
    this.observer = new IntersectionObserver(
      this.onElementObserved, 
      {
        root: null,
        threshold: 1.0,
      }
    )
  },
  async mounted(){
    this.observer.observe(this.$refs.sticky)

    const data = (await axios.get('/getAlbum', { params: {
      id: this.id
    }})).data
    const album = data['subsonic-response']['album']
    console.log(album)
    this.title = album.name
    this.artist = album.artist
    this.cover = `http://192.168.1.13:4533/rest/getCoverArt?u=${axios.defaults.params.u}&s=${axios.defaults.params.s}&t=${axios.defaults.params.t}&f=json&c=Orpheus&v=1.8.0&id=${this.id}&size=300`
    for(const song of album.song) {
      this.songs.push({id: song.id, number: song.track, title: song.title, type: String(song.contentType).slice(6,20).toUpperCase(), length: 'FIX'})
    }
  },

  unmounted(){
    this.observer.disconnect()
  },
  methods: {
    playTrack(title, id) {
      this.$store.commit('setNowPlaying', {title: title, id: id})
    },
    onElementObserved(e) {
      e.forEach(({ target, isIntersecting}) => {
        this.$refs.albumBar.classList.toggle("bg-gray-900", !isIntersecting)
      })

    }
  }
  ,
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.active {
    background-image: linear-gradient(to right, var(--tw-gradient-stops));
}
</style>
