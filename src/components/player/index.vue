<template>
  <main>
    <!-- Test -->
    <div
      id="container"
      class="grid grid-cols-3 text-sm grid-row-1"
    >
      <!-- This is hacked I couldnt get it allign center vertically any other way then puttin it inside a div -->
      <div class="flex items-center justify-center">
        <div
          id="volume"
          class="w-20"
        >
          <Slider
            v-model="volume"
            :step="-1"
            :tooltips="false"
            @update="volumeChange"
          />
        </div>
      </div>

      <div
        id="playControls"
        class="col-start-2"
      >
        <!-- Previous Button -->
        <button
          class="px-4 py-2 font-bold text-gray-800 co"
          @click="previosTrack"
        >
          <font-awesome-icon
            icon="fast-backward"
            color="gray"
          />
        </button>
        <!-- Play Button -->
        <button
          class="px-4 py-2 font-bold text-gray-800 co"
          @click="playPause"
        >
          <font-awesome-icon
            :icon="currentIcon"
            color="gray"
          />
        </button>
        <!-- Next Button -->
        <button
          class="px-4 py-2 font-bold text-gray-800 co"
          @click="nextTrack"
        >
          <font-awesome-icon
            icon="fast-forward"
            color="gray"
          />
        </button>
      </div>
      <div
        class="flex items-center justify-center col-start-3"
      >
        <a
          class="hover:text-pink-500"
          @click="goTo('ArtistDetails/' + currentTrack.artistId)"
        >{{ currentTrack.artist }}</a>
        <a> &nbsp;-&nbsp; </a>
        <a
          class="hover:text-pink-500"
          @click="goTo('AlbumDetails/' + currentTrack.albumId)"
        >{{ currentTrack.title }}</a>
      </div>
      <audio
        id="appPlayer"
        ref="appPlayer"
        class="hidden"
        name="appPlayer"
        style="hidden"
        preload
        @ended="nextTrack"
      />
    </div>

    <div class="grid w-full pb-1 text-xs grid-row-1">
      <a>{{ eTime }} / {{ duration }}</a>
      <div id="playbar">
        <Slider
          v-model="percentPlayed"
          :step="-1"
          :tooltips="false"
          @update="barChange"
        />
      </div>
    </div>
    <AvCanvas
      v-if="myAnalyser"
      :audioAnalyser="myAnalyser"
    />
  </main>
</template>

<script>
import Slider from '@vueform/slider'
import AvCanvas from "./visualiser/index.vue"
import '../../freqtimeupdate'

export default ({
  name: "Player",
  components: {
    Slider,
    AvCanvas
  },
  data() {
    return {
      appPlayer: undefined,
      currentTrack: '',
      isPlaying: false,
      paused: false,
      myAnalyser: null,
      currentIcon: 'play',
      percentPlayed: 0,
      eTime: '00:00',
      volume: 0.11255000000000001,
      duration: '00:00'
    }
  },
  computed: {
    nowPlaying () {
      return this.$store.state.nowPlaying
    }
  },
  watch: {
    // This watch triggers playTrack. by doing       this.$store.commit('setNowPlaying', {title: track.title, id: track.id})
    // Do not do that inside the playTrack function as it will cause a infinite loop
    nowPlaying (newPlaying, oldPlaying ) {
      if(oldPlaying){
        this.$store.commit('setPreviousPlaying', {title: oldPlaying.title, id: oldPlaying.id})
      }
      this.playTrack(newPlaying)
    }
  },
  created() {
  },
  mounted() {
    this.createAnalyser()
    this.appPlayer = this.$refs.appPlayer
    this.$nextTick(function() {
      this.$watch("isPlaying",function() {
        if(this.isPlaying) {
          console.log("Audio playback started.")
          //prevent starting multiple listeners at the same time
          if(!this.listenerActive) {
            console.log('Add listener')
            this.listenerActive=true
            //for a more consistent timeupdate, include freqtimeupdate.js and replace both instances of 'timeupdate' with 'freqtimeupdate'
            //frequent.add(this.appPlayer, this.playbackListener);
            this.appPlayer.addEventListener("freqtimeupdate",this.playbackListener)
          }
        }
      })
    })

  },
  methods: {
    convertTime(seconds){
      const format = val => `0${Math.floor(val)}`.slice(-2)
      //var hours = seconds / 3600;
      const minutes = (seconds % 3600) / 60
      return [minutes, seconds % 60].map(format).join(":")
    },
    goTo(p) {
      console.log(p)
      this.$router.push({path: `/${p}`})
    },
    createAnalyser(){
      const ctx = new AudioContext()
      const src = ctx.createMediaElementSource(this.$refs.appPlayer)
      ctx.crossOrigin = 'anonymous'
      this.$refs.appPlayer.crossOrigin = 'anonymous'
      this.myAnalyser = ctx.createAnalyser()
      src.connect(this.myAnalyser)
      this.myAnalyser.fftSize = 8192
      this.myAnalyser.connect(ctx.destination)
    },
    barChange(e){
      const time = e / 100 * this.appPlayer.duration
      const diff = Math.abs( time - this.appPlayer.currentTime )
      if(diff > 0.1) {
        console.log(diff)
        this.appPlayer.currentTime = time
      }
    },
    previosTrack(){
      const track = this.$store.state.previousPlaying     
      //this.playTrack(this.$store.state.previousPlaying)
      this.$store.commit('setNowPlaying', {title: track.title, id: track.id, artistId: track.artistId, albumId: track.albumId, artist: track.artist})

      console.log('Previous track clicked')
    },
    nextTrack() {
      const track = this.$store.state.queue.shift()
      //this.playTrack(track)
      console.log(JSON.stringify(track))
      this.$store.commit('setNowPlaying', {title: track.title, id: track.id, artistId: track.artistId, albumId: track.albumId, artist: track.artist})
      console.log('Next track clicked')
    },
    volumeChange (e) {
      this.appPlayer.volume = e / 100 / 2
      console.log(this.appPlayer.volume)
    },
    playPause() {
      if(this.paused) {
        console.log('Play/Pause -- Resume')
        this.isPlaying = true
        this.paused = false
        this.appPlayer.play()
        this.$store.commit('setIsPlaying', true)
        this.currentIcon = "pause"
      }  else {
        console.log('Play/Pause -- Pause')
        this.isPlaying = false
        this.paused = true
        this.appPlayer.pause()
        this.$store.commit('setIsPlaying', false)
        this.currentIcon = "play"
      }
    },
    playTrack(track) {
      this.appPlayer.volume = 0.11255000000000001
      console.log("Got play track " + JSON.stringify(track))
      this.appPlayer.src = `http://192.168.1.18:4533/rest/stream?u=***REMOVED***&t=***REMOVED***&s=558dbf&f=json&v=1.8.0&c=NavidromeUI&id=${track.id}&_=1627823120382`
      this.appPlayer.play()
      this.$store.commit('setIsPlaying', true)
      this.isPlaying = true
      this.currentIcon = "pause"
      this.currentTrack = track

    },
    playbackListener() {
      const percentage = (this.appPlayer.currentTime / this.appPlayer.duration) * 100
      this.duration = this.convertTime(this.appPlayer.duration)
      this.percentPlayed = percentage
      const seconds = this.appPlayer.currentTime
      this.eTime = this.convertTime(seconds)
      this.playbackTime = this.appPlayer.currentTime
    }
  },
})
</script>
