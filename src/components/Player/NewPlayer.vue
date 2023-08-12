<script>
import { storeToRefs } from 'pinia'
import { computed, inject, ref, watch, onMounted } from 'vue'
import VueSlider from 'vue-slider-component'
import '@/assets/slider.css'
import '@/freqtimeupdate'
import { usePlayerStore } from '@/stores/player'
export default {
  components: {
    VueSlider
  },
  setup () {
    const player = inject('$player')
    const deaftone = inject('$deaftone')
    const settings = inject('$settings')
    const router = inject('$router')
    const store = usePlayerStore()
    const { isPlaying, nowPlaying, progress, volume } = storeToRefs(store)
    const playingIndex = computed(() => store.playingIndex)
    /*     const eTime = ref('00:00')
    const viewDuration = ref('00:00') */
    const duration = ref(0)
    const currentIcon = ref('play')
    const isLiked = ref(false)

    if (isPlaying.value) {
      console.log('Found song playing')
    } else {
      console.log('Didn\'t song playing')
    }
    watch(isPlaying, (currentValue, oldValue) => {
      if (isPlaying.value) { setPlayIcon('pause') } else {
        setPlayIcon('play')
      }
      // viewDuration.value = convertTime(store.nowPlaying.duration)
      duration.value = store.nowPlaying.length
    })
    watch(nowPlaying, (currentValue) => {
      isLiked.value = currentValue.liked
    })
    async function likeSong () {
      const data = await deaftone.likeSong(store.nowPlaying.id)
      store.nowPlaying.liked = data.liked
      isLiked.value = data.liked
    }
    function convertTime (seconds) {
      const format = val => `0${Math.floor(val)}`.slice(-2)
      // var hours = seconds / 3600;
      const minutes = (seconds % 3600) / 60
      return [minutes, seconds % 60].map(format).join(':')
    }
    function goToAlbum (id) {
      router.push({ path: `/AlbumDetails/${id}` })
    }
    function goToArtist (id) {
      router.push({ path: `/ArtistDetails/${id}` })
    }
    function seek (e, t) {
      console.log(`SEEK: ${e}`)
      player.seekTrack(e)
    }
    function previousTrack () {
      player.previousTrack()
    }
    function nextTrack () {
      player.nextTrack()
    }
    function volumeChange (e) {
      settings.set('volume', e).then(() => {
        player.changeVolume(e)
      })
    }
    function playPause () {
      if (isPlaying.value) {
        console.log('Play/Pause -- Pause')
      } else {
        console.log('Play/Pause -- Resume')
      }
      player.togglePlay()
    }

    function setPlayIcon (value) {
      currentIcon.value = value
    }
    // Update volume from settings store
    onMounted(async () => {
      store.setVolume(await settings.get('volume'))
    })
    return {
      likeSong,
      isLiked,
      nowPlaying,
      progress,
      volume,
      playingIndex,
      convertTime,
      goToArtist,
      goToAlbum,
      seek,
      previousTrack,
      nextTrack,
      duration,
      volumeChange,
      playPause,
      currentIcon
    }
  }
}
</script>

<style lang="scss" scoped>
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

  .volume-control {
    margin-left: 4px;
    display: flex;
    align-items: center;
    .volume-bar {
      width: 84px;
    }
  }
}

</style>
<template>
  <div
    class="flex w-full flex-col items-center justify-center bg-neutral pb-2 text-sm text-neutral-content"
    @click="toggleLyrics"
  >
    <div
      class="-my-1.5 w-full pb-2"
      @click.stop
    >
      <!--         Currently there is a bug where streaming transcoded songs breaks the bar if you skip -->
      <vue-slider
        v-model="progress"
        :min="0"
        :max="duration"
        :interval="1"
        :drag-on-click="true"
        :duration="0"
        :dot-size="12"
        :height="2"
        :tooltip-formatter="convertTime"
        :lazy="false"
        :silent="true"
        @change="seek"
      />
    </div>
    <div class="grid grid-cols-3 px-2">
      <div class="flex items-center">
        <div
          class="flex items-center"
          v-if="nowPlaying.title"
          @click.stop
        >
          <img
            loading="lazy"
            class="h-12 w-12 select-none rounded "
            :src="nowPlaying.cover"
            @click="$router.push({ path: `/AlbumDetails/${nowPlaying.albumId}` })"
          >
          <!-- Track info -->
          <div
            class="ml-2 flex flex-col text-left"
          >
            <div>
              <span
                class="line-clamp-1 hover:cursor-pointer hover:underline"
                @click="$router.push({ path: `/AlbumDetails/${nowPlaying.albumId}` })"
              >{{ nowPlaying.title }}</span>
            </div>
            <div>
              <span
                class="hover:cursor-pointer hover:underline"
                @click="$router.push({ path: `/ArtistDetails/${nowPlaying.artistId}` })"
              >{{ nowPlaying.artist }}</span>
              <!--                 <span
                  v-for="(ar, index) in currentTrack.ar"
                  :key="ar.id"
                  @click="ar.id && goToArtist(ar.id)"
                >
                  <span :class="{ ar: ar.id }"> {{ ar.name }} </span><span v-if="index !== currentTrack.ar.length - 1">, </span>
                </span> -->
            </div>
          </div>
          <div class="pl-3">
            <button
              @click="likeSong"
              class="btn bg-base-100 font-bold hover:bg-base-200"
            >
              <font-awesome-icon
                v-show="!isLiked"
                :icon="['far', 'heart']"
              />
              <font-awesome-icon
                v-show="isLiked"
                :icon="['fas', 'heart']"
              />
            </button>
          </div>
        </div>
      </div>
      <div class="flex md:mx-32">
        <div class="flex items-center justify-center" />
        <div
          class="flex flex-1"
          @click.stop
        >
          <!-- Previous Button -->
          <button
            class="btn mr-2 bg-base-100 px-4 py-2 font-bold hover:bg-base-200"
            @click="previousTrack"
          >
            <font-awesome-icon
              icon="fast-backward"
              color="gray"
            />
          </button>
          <!-- Play Button -->
          <button
            class="btn w-11 bg-base-100 px-4 py-2 font-bold hover:bg-base-200"
            @click="playPause"
          >
            <font-awesome-icon
              :icon="currentIcon"
              color="gray"
            />
          </button>
          <!-- Next Button -->
          <button
            class="btn ml-2 bg-base-100 px-4 py-2 font-bold hover:bg-base-200"
            @click="nextTrack"
          >
            <font-awesome-icon
              icon="fast-forward"
              color="gray"
            />
          </button>
        </div>
        <div class="grow" />
      </div>
      <!-- Volume slider -->
      <div class="right-control-buttons flex">
        <div class="grow" />
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
                @change="volumeChange"
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
</template>
