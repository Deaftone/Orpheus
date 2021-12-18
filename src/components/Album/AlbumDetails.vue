<template>  
  <div class="grid grid-cols-1 gap-5 pt-10 pb-10">
    <!--     <div
      ref="albumInfo"
      class="pl-40 pr-40 lg:flex"
    >
      <img
        class="shadow-xl"
        :src="cover"
      >
      <div class="flex flex-col justify-center w-screen pl-10 m-auto">
        <span class="text-xl font-bold lg:text-6xl">{{ title }}</span>
        <span
          class="pt-5 font-bold lg:text-3xl text-primary"
        ><a
          class="cursor-pointer"
          @click=" $router.push({path: `/ArtistDetails/${artistId}`}) "
        >{{ artist }}</a></span>
      </div>
    </div> -->
    <div class="flex justify-center w-full pl-10 pr-10 lg:pr-40 lg:pl-40 lg:block">
      <div class="card lg:card-side bg-base-300">
        <figure>
          <img
            class="object-contain w-full h-72"
            :src="cover"
          >
        </figure> 
        <div class="card-body">
          <h2 class="text-xl font-bold card-title lg:text-6xl ">
            {{ title }}
          </h2> 
          <div class="card-actions text-primary">
            <a
              class="cursor-pointer"
              @click=" $router.push({path: `/ArtistDetails/${artistId}`}) "
            >{{ artist }}</a>
          </div>
        </div>
      </div> 
    </div>
    <div
      ref="sticky"
      class=""
      style="height:0.1px"
    />
    <!-- Bug where the currently playing track is above this in z-index -->
    <div
      ref="albumBar"
      class="sticky top-0 w-full p-1 pl-5 pr-5 -mt-5 text-sm lg:pl-40 lg:pr-40 bg-base-200"
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
    <div class="grid w-full grid-cols-1 gap-5 pl-5 pr-5 lg:pr-40 lg:pl-40">
      <div
        v-for="song in songs"
        :id="song.id"
        :key="song.number"
        class="flex justify-center p-1 text-lg rounded-lg cursor-pointer bg-base-300"
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
          <div class="float-right pl-1 pr-1 mr-5 text-sm border-4 border-solid rounded-lg border-primary">
            <a>{{ song.type }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../utils/apiAxios'

export default {
  name: 'AlbumDetails',
  props: {id: {type: String, required: true}},
  data() {
    return {
      observer: null,
      title: '',
      artist: '',
      artistId: '',
      albumId: '',
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
      console.log(newPlaying)
      this.highLightNowPlaying(oldPlaying, newPlaying)
    }
  }, 
  created() {
    this.observer = new IntersectionObserver(
      this.onElementObserved, 
      {
        root: null,
        threshold: 0.9,
      }
    )
  },
  async mounted(){
    this.observer.observe(this.$refs.sticky)

    const data = (await axios.get('/getAlbum', { params: {
      id: this.id
    }})).data
    const album = data['subsonic-response']['album']
    this.title = album.name
    this.artist = album.artist
    this.artistId = album.artistId
    this.albumId = album.id
    const currentlyPlaying = this.$store.state.nowPlaying || ''
    let tempPlaying = null
    this.cover = `https://navi.raspi.local/rest/getCoverArt?u=${axios.defaults.params.u}&s=${axios.defaults.params.s}&t=${axios.defaults.params.t}&f=json&c=Orpheus&v=1.8.0&id=${this.id}`
    for(const song of album.song) {
      this.songs.push({id: song.id, number: song.track, title: song.title, artistId: album.artistId, albumId: album.id, artist: album.artist, type: String(song.contentType).slice(6,20).toUpperCase(), length: 'FIX'})
      // Check if currently playing song in in this track list. If so save and highlight it
      if(song.id === currentlyPlaying.id) {
        tempPlaying = {title: song.title, id: song.id}
      }
    }

    this.$nextTick(function () {

      if(tempPlaying){
        this.highLightNowPlaying(null, tempPlaying)

      }
    })
  },

  unmounted(){
    this.observer.disconnect()
  },
  methods: {
    playTrack(title, id) {
      const index = this.songs.findIndex(x => x.id === id)
      const songs = this.songs.slice(index + 1, this.songs.length)
      this.$store.commit('setQueue', songs)
      this.$store.commit('setNowPlaying', {title: title, id: id, artistId: this.artistId, albumId: this.albumId, artist: this.artist})
    },
    onElementObserved(e) {
      e.forEach(({ target, isIntersecting}) => {
        this.$refs.albumBar.classList.toggle("bg-base-200", !isIntersecting)
      })
    },
    highLightNowPlaying(oldPlaying, newPlaying) {
      console.log(newPlaying)
      let oldP

      if(oldPlaying) {
        oldP = document.getElementById(oldPlaying.id) 
      }

      const newP = document.getElementById(newPlaying.id)

      if(oldP) {
        oldP.classList.remove("gradient-border","border-solid", "border-4", "border-primary")
      }
      if(newP) {
        newP.classList.add("gradient-border","border-solid", "border-4", "border-primary")
      }
    },
  }
  ,
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.gradient-border {
  --borderWidth: 3px;
  position: relative;
  animation: animatedgradient 1s ease alternate infinite;
}


@keyframes animatedgradient {
	0% {
    border-color: var(--sf);
	}
	50% {
    border-color: var(--pf);
	}

}

</style>
