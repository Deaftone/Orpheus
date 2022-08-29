<script>
import '../../assets/slider.css'
import VueSlider from 'vue-slider-component'
import '../../freqtimeupdate'
import { computed, inject, onMounted, ref, watch } from 'vue'
import { usePlayerStore } from '../../stores/player'
export default ({
  components: {
    VueSlider
  },
  setup () {
    const deaftone = inject('$deaftone')
    const player = inject('$player')
    const store = usePlayerStore()
    const appPlayer = ref(null)
    const nowPlaying = computed(() => store.nowPlaying)
    const playingIndex = computed(() => store.playingIndex)
    const isPlaying = computed(() => store.isPlaying)
    const eTime = ref('00:00')
    const viewDuration = ref('00:00')
    const duration = ref(0)
    const percentPlayed = ref(0)
    const currentIcon = ref('play')
    let listenerActive = false
    watch(isPlaying, (currentValue, oldValue) => {
      console.log('test')
      if (isPlaying.value) { console.log('Audio playback started.') }
      console.log(listenerActive)
      // prevent starting multiple listeners at the same time
      if (!listenerActive) {
        console.log('Add listener')
        viewDuration.value = convertTime(appPlayer.value.duration)
        duration.value = appPlayer.value.duration
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

    function toggleVis () {
      /*
        Fix me
        For some reason when creating a new AudioCtx the player volume goes up
        I would like to have it destroyed when hidden
      */
      this.visToggled ^= true
      if (this.visToggled) {
        // this.src.connect(this.myAnalyser)
        // this.myAnalyser.connect(this.ctx.destination)
      } else {
        // this.src.disconnect(this.myAnalyser)
        // this.myAnalyser.disconnect(this.ctx.destination)

      }
      // document.getElementById('barC').classList.toggle('pb-3')
    }
    function setMediaControls (title, artist, album, src) {
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title,
          artist,
          album,
          artwork: [
            { src: src || '', sizes: '256x256', type: 'image/png' }
          ]
        })

        navigator.mediaSession.setActionHandler('play', () => { playPause() })
        navigator.mediaSession.setActionHandler('pause', () => { playPause() })
        navigator.mediaSession.setActionHandler('previoustrack', () => { previosTrack() })
        navigator.mediaSession.setActionHandler('nexttrack', () => { nextTrack() })
      }
    }
    function convertTime (seconds) {
      const format = val => `0${Math.floor(val)}`.slice(-2)
      // var hours = seconds / 3600;
      const minutes = (seconds % 3600) / 60
      return [minutes, seconds % 60].map(format).join(':')
    }
    function goTo (p) {
      console.log(p)
      this.$router.push({ path: `/${p}` })
    }
    /*     function createAnalyser () {
      this.ctx = new AudioContext()
      this.src = this.ctx.createMediaElementSource(appPlayer)
      this.ctx.crossOrigin = 'anonymous'
      this.$refs.appPlayer.crossOrigin = 'anonymous'
      this.myAnalyser = this.ctx.createAnalyser()
      this.src.connect(this.myAnalyser)
      this.myAnalyser.fftSize = 8192
      this.myAnalyser.connect(this.ctx.destination)
    } */
    function barChange (e) {
      const time = e / 100 * appPlayer.value.duration
      const diff = Math.abs(time - appPlayer.value.currentTime)
      if (diff > 0.1) {
        console.log(diff)
        appPlayer.value.currentTime = time
      }
    }
    function previosTrack () {
      const track = store.previousQueue.pop()
      store.previousTrack()
      if (track) { store.setNowPlaying(track) }

      console.log('Previous track clicked')
    }
    function nextTrack () {
      console.log(`Adding to pqueue${JSON.stringify(store.nowPlaying)}`)
      store.addToPQueue(store.nowPlaying)
      store.nextTrack()
      const track = store.queue[store.playingIndex]
      console.log(`Next track update ${JSON.stringify(track)}`)
      if (track) { store.setNowPlaying(track) }
    }
    function volumeChange (e) {
      appPlayer.value.volume = e / 100 / 2
      console.log(appPlayer.value.volume)
    }
    function playPause () {
      /*       if (isPlaying.value) {
        console.log('Play/Pause -- Pause')
        appPlayer.value.pause()
        store.setIsPlaying(false)
        setPlayIcon('play')
      } else {
        console.log('Play/Pause -- Resume')
        appPlayer.value.play()
        store.setIsPlaying(true)
        setPlayIcon('pause')
      } */
      player.play()
    }
    function playTrack (track) {
      /*       if (!this.myAnalyser)
        this.createAnalyser()
 */
      console.log(`Got play track ${JSON.stringify(track)}`)
      appPlayer.value.src = deaftone.stream(track.id)
      appPlayer.value.play()
      store.setIsPlaying(true)
      setPlayIcon('pause')
    }

    function setPlayIcon (value) {
      currentIcon.value = value
    }
    function playbackListener () {
      const percentage = (appPlayer.value.currentTime / appPlayer.value.duration) * 100
      viewDuration.value = convertTime(appPlayer.value.duration)
      percentPlayed.value = percentage
      const seconds = appPlayer.value.currentTime
      eTime.value = convertTime(seconds)
    }

    return {
      nowPlaying,
      playingIndex,
      appPlayer,
      convertTime,
      goTo,
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
      currentIcon
    }
  }
})
</script>

<style lang="scss" scoped>
.player {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 64px;
  backdrop-filter: saturate(180%) blur(30px);
  // background-color: rgba(255, 255, 255, 0.86);
  background-color: var(--color-navbar-bg);
  z-index: 100;
}

@supports (-moz-appearance: none) {
  .player {
    background-color: var(--color-body-bg);
  }
}

.progress-bar {
  margin-top: -6px;
  margin-bottom: -6px;
  width: 100%;
}

.controls {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 100%;
  padding: {
    right: 10vw;
    left: 10vw;
  }
}

@media (max-width: 1336px) {
  .controls {
    padding: 0 5vw;
  }
}

.blank {
  flex-grow: 1;
}

.playing {
  display: flex;
}

.playing .container {
  display: flex;
  align-items: center;
  img {
    height: 46px;
    border-radius: 5px;
    box-shadow: 0 6px 8px -2px rgba(0, 0, 0, 0.16);
    cursor: pointer;
    user-select: none;
  }
  .track-info {
    height: 46px;
    margin-left: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .name {
      font-weight: 600;
      font-size: 16px;
      opacity: 0.88;
      color: var(--color-text);
      margin-bottom: 4px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      word-break: break-all;
    }
    .has-list {
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    .artist {
      font-size: 12px;
      opacity: 0.58;
      color: var(--color-text);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      word-break: break-all;
      span.ar {
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

.middle-control-buttons {
  display: flex;
}

.middle-control-buttons .container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  .button-icon {
    margin: 0 8px;
  }
  .play {
    height: 42px;
    width: 42px;
    .svg-icon {
      width: 24px;
      height: 24px;
    }
  }
}

.right-control-buttons {
  display: flex;
}

.right-control-buttons .container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .expand {
    margin-left: 24px;
    .svg-icon {
      height: 24px;
      width: 24px;
    }
  }
  .active .svg-icon {
    color: var(--color-primary);
  }
  .volume-control {
    margin-left: 4px;
    display: flex;
    align-items: center;
    .volume-bar {
      width: 84px;
    }
  }
}

.like-button {
  margin-left: 16px;
}

.button-icon.disabled {
  cursor: default;
  opacity: 0.38;
  &:hover {
    background: none;
  }
  &:active {
    transform: unset;
  }
}
</style>
<template>
  <main class="grid grid-cols-3 text-sm grid-row-1">
    <audio
      id="appPlayer"
      ref="appPlayer"
      class="hidden"
      name="appPlayer"
      style="hidden"
      preload
      @ended="nextTrack"
    />
    <div
      class="player"
      @click="toggleLyrics"
    >
      <div
        class="progress-bar"

        @click.stop
      >
        <vue-slider
          v-model="percentPlayed"
          :min="0"
          :max="duration"
          :interval="1"
          :drag-on-click="true"
          :duration="0"
          :dot-size="12"
          :height="2"
          :tooltip-formatter="formatTrackTime"
          :lazy="true"
          :silent="true"
        />
      </div>
      <div class="controls">
        <div class="playing">
          <div
            class="container"
            @click.stop
          >
            <!--          <img
            loading="lazy"
            :src="currentTrack.al && currentTrack.al.picUrl | resizeImage(224)"
            @click="goToAlbum"
          > -->
            <div
              class="track-info"
              :title="audioSource"
            >
            <!--             <div
              :class="['name', { 'has-list': hasList() }]"
              @click="hasList() && goToList()"
            >
              {{ currentTrack.name }}
            </div> -->
            <!--             <div class="artist">
              <span
                v-for="(ar, index) in currentTrack.ar"
                :key="ar.id"
                @click="ar.id && goToArtist(ar.id)"
              >
                <span :class="{ ar: ar.id }"> {{ ar.name }} </span><span v-if="index !== currentTrack.ar.length - 1">, </span>
              </span>
            </div> -->
            </div>
          <!--           <div class="like-button">
            <button-icon
              :title="$t('player.like')"
              @click.native="likeATrack(player.currentTrack.id)"
            >
              <i-fluent:heart-20-regular v-show="!player.isCurrentTrackLiked" />
              <i-fluent:heart-16-filled v-show="player.isCurrentTrackLiked" />
            </button-icon>
          </div> -->
          </div>
          <div class="blank" />
        </div>
        <div class="middle-control-buttons">
          <div class="blank" />
          <div
            class="container"
            @click.stop
          >
            <!--           <button-icon
            v-show="!player.isPersonalFM"
            :title="$t('player.previous')"
            @click.native="playPrevTrack()"
          >
            <i-fluent-previous-16-filled />
          </button-icon>
          <button-icon
            v-show="player.isPersonalFM"
            title="不喜欢"
            @click.native="moveToFMTrash()"
          >
            <i-fa:thumbs-down id="thumbs-down" />
          </button-icon> -->
            <!--          <button-icon
            class="play"
            :title="$t(player.playing ? 'player.pause' : 'player.play')"
            @click.native="playOrPause"
          >
            <i-fluent-play-12-filled v-if="!player.playing" />
            <i-fluent-pause-12-filled v-else />
          </button-icon>
          <button-icon
            :title="$t('player.next')"
            @click.native="playNextTrack"
          >
            <i-fluent-previous-16-filled
              style="transform: rotate(180deg)"
            />
          </button-icon> -->

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
          <div class="blank" />
        </div>
        <div class="right-control-buttons">
          <div class="blank" />
          <div
            class="container"
            @click.stop
          >
            <div class="volume-control">
              <div class="volume-bar">
                <vue-slider
                  v-model="volume"
                  :min="0"
                  :max="1"
                  :interval="0.01"
                  :drag-on-click="true"
                  :duration="0"
                  tooltip="none"
                  :dot-size="12"
                />
              </div>
            </div>
          <!--
          <button-icon
            class="lyrics-button"
            title="歌词"
            style="margin-left: 12px"
            @click.native="toggleLyrics()"
          >
            <i-fluent:chevron-up-12-filled />
          </button-icon> -->
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
