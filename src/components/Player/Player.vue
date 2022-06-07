<script>
import Slider from '@vueform/slider'
import '../../freqtimeupdate'
import { computed, onMounted, ref, watch } from 'vue'
import { usePlayerStore } from '../../stores/player'
import AvCanvas from './Visualiser.vue'
export default ({
  components: {
    Slider,
    AvCanvas,
  },
  setup() {
    const store = usePlayerStore()
    const appPlayer = ref(null)
    const nowPlaying = computed(() => store.nowPlaying)
    const playingIndex = computed(() => store.playingIndex)
    const isPlaying = computed(() => store.isPlaying)
    const eTime = ref('00:00')
    const duration = ref('00:00')
    const percentPlayed = ref(0)
    const currentIcon = ref('play')
    let listenerActive = false
    let paused = false
    watch(isPlaying, (currentValue, oldValue) => {
      console.log('test')
      if (isPlaying.value)
        console.log('Audio playback started.')
      console.log(listenerActive)
      // prevent starting multiple listeners at the same time
      if (!listenerActive) {
        console.log('Add listener')
        duration.value = convertTime(appPlayer.value.duration)

        listenerActive = true
        // for a more consistent timeupdate, include freqtimeupdate.js and replace both instances of 'timeupdate' with 'freqtimeupdate'
        // frequent.add(appPlayer, this.playbackListener)
        appPlayer.value.addEventListener('freqtimeupdate', playbackListener)
      }
    })
    watch(nowPlaying, (newValue, oldValue) => {
      console.log(`Now playing old ${oldValue}`)
      console.log(`Now playing update ${newValue}`)
      console.log(newValue.cover)
      playTrack(newValue)
      setMediaControls(newValue.title, newValue.artist, newValue.albumName, newValue.cover)
      store.setNowPlaying(newValue)
    })
    watch(playingIndex, (newValue, oldValue) => {
      store.setPlayingIndex(newValue)
    })
    /*     watch(newPlaying, (currentValue, newValue) => {

    }) */
    onMounted(async () => {
      volumeChange(25)
    })

    function toggleVis() {
      /*
        Fix me
        For some reason when creating a new AudioCtx the player volume goes up
        I would like to have it destroyed when hidden
      */
      this.visToggled ^= true
      if (this.visToggled) {
        // this.src.connect(this.myAnalyser)
        // this.myAnalyser.connect(this.ctx.destination)
      }
      else {
        // this.src.disconnect(this.myAnalyser)
        // this.myAnalyser.disconnect(this.ctx.destination)

      }
      // document.getElementById('barC').classList.toggle('pb-3')
    }
    function setMediaControls(title, artist, album, src) {
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title,
          artist,
          album,
          artwork: [
            { src: src || '', sizes: '256x256', type: 'image/png' },
          ],
        })

        navigator.mediaSession.setActionHandler('play', () => { playPause() })
        navigator.mediaSession.setActionHandler('pause', () => { playPause() })
        navigator.mediaSession.setActionHandler('previoustrack', () => { previosTrack() })
        navigator.mediaSession.setActionHandler('nexttrack', () => { nextTrack() })
      }
    }
    function convertTime(seconds) {
      const format = val => `0${Math.floor(val)}`.slice(-2)
      // var hours = seconds / 3600;
      const minutes = (seconds % 3600) / 60
      return [minutes, seconds % 60].map(format).join(':')
    }
    function goTo(p) {
      console.log(p)
      this.$router.push({ path: `/${p}` })
    }
    function createAnalyser() {
      this.ctx = new AudioContext()
      this.src = this.ctx.createMediaElementSource(appPlayer)
      this.ctx.crossOrigin = 'anonymous'
      this.$refs.appPlayer.crossOrigin = 'anonymous'
      this.myAnalyser = this.ctx.createAnalyser()
      this.src.connect(this.myAnalyser)
      this.myAnalyser.fftSize = 8192
      this.myAnalyser.connect(this.ctx.destination)
    }
    function barChange(e) {
      const time = e / 100 * appPlayer.value.duration
      const diff = Math.abs(time - appPlayer.value.currentTime)
      if (diff > 0.1) {
        console.log(diff)
        appPlayer.value.currentTime = time
      }
    }
    function previosTrack() {
      const track = store.previousQueue.pop()
      store.previousTrack()
      if (track)
        store.setNowPlaying(track)

      console.log('Previous track clicked')
    }
    function nextTrack() {
      // console.log(this.$store.state.queue.length)
      // console.log(this.$store.state.playingIndex)
      console.log(`Adding to pqueue${JSON.stringify(store.nowPlaying)}`)
      store.addToPQueue(store.nowPlaying)
      store.nextTrack()
      const track = store.queue[store.playingIndex]
      console.log(`Next track update ${JSON.stringify(track)}`)
      if (track)
        store.setNowPlaying(track)
    }
    function volumeChange(e) {
      appPlayer.value.volume = e / 100 / 2
      console.log(appPlayer.value.volume)
    }
    function playPause() {
      if (paused) {
        console.log('Play/Pause -- Resume')
        store.isPlaying = true
        paused = false
        appPlayer.value.play()
        store.setIsPlaying(true)
        currentIcon.value = 'pause'
      }
      else {
        console.log('Play/Pause -- Pause')
        store.isPlaying = false
        paused = true
        appPlayer.value.pause()
        store.setIsPlaying(false)
        currentIcon.value = 'play'
      }
    }
    function playTrack(track) {
      /*       if (!this.myAnalyser)
        this.createAnalyser()
 */
      console.log(`Got play track ${JSON.stringify(track)}`)
      appPlayer.value.src = `https://navi.raspi.local/rest/stream?u=***REMOVED***&t=***REMOVED***&s=558dbf&f=json&v=1.8.0&c=NavidromeUI&id=${track.id}&_=1627823120382`
      appPlayer.value.play()
      store.setIsPlaying(true)
      currentIcon.value = 'pause'
    }
    function playbackListener() {
      const percentage = (appPlayer.value.currentTime / appPlayer.value.duration) * 100
      duration.value = convertTime(appPlayer.value.duration)
      percentPlayed.value = percentage
      const seconds = appPlayer.value.currentTime
      eTime.value = convertTime(seconds)
      // this.playbackTime = appPlayer.value.currentTime
    }
    const clicked = false

    function togglePlayButton() {
      if (store.isPlaying) {
        currentIcon.value = 'play'
        console.log('Set to play')
      }
      else {
        currentIcon.value = 'pause'
        console.log('Set to pause')
      }
    }
    return {
      nowPlaying,
      playingIndex,
      appPlayer,
      convertTime,
      goTo,
      createAnalyser,
      barChange,
      previosTrack,
      nextTrack,
      eTime,
      duration,
      volumeChange,
      playPause,
      percentPlayed,
      playTrack,
      playbackListener,
      currentIcon,
    }
  },
  data() {
    return {
      myAnalyser: null,
      myAnalyserHidden: null,
      ctx: null,
      src: null,
      visToggled: false,
      volume: 25,
    }
  },
})
</script>

<template>
  <main class="bg-neutral text-neutral-content">
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
        <a
          class="pl-10 cursor-pointer hover:text-primary"
          @click="toggleVis"
        >Visualiser</a>
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
        v-if="nowPlaying"
        class="flex items-center justify-center col-start-3"
      >
        <a
          class="cursor-pointer hover:text-primary"
          @click="goTo(`ArtistDetails/${nowPlaying.artistId}`)"
        >{{ nowPlaying.artist }}</a>
        <a> &nbsp;-&nbsp; </a>
        <a
          class="cursor-pointer hover:text-primary"
          @click="goTo(`AlbumDetails/${nowPlaying.albumId}`)"
        >{{ nowPlaying.title }}</a>
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

    <div
      id="barC"
      class="grid w-full pb-3 text-xs grid-row-1 "
    >
      <a>{{ eTime }} / {{ duration }}</a>
      <div
        id="playbar"
        class="mt-2 mb-2 ml-96 mr-96"
      >
        <Slider
          v-model="percentPlayed"
          :step="-1"
          :tooltips="false"
          @update="barChange"
        />
      </div>
    </div>
    <AvCanvas
      v-if="myAnalyser && visToggled"
      :audio-analyser="myAnalyser"
    />
  </main>
</template>
