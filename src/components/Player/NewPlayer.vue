<script>
import '../../assets/slider.css'
import VueSlider from 'vue-slider-component'
import '../../freqtimeupdate'
import { computed, inject, onMounted, ref, watch } from 'vue'
import { usePlayerStore } from '../../stores/player'
import { storeToRefs } from 'pinia'
export default ({
  components: {
    VueSlider
  },
  setup () {
    const player = inject('$player')
    const router = inject('$router')
    const store = usePlayerStore()
    const { isPlaying, nowPlaying, progress, volume } = storeToRefs(store)
    const playingIndex = computed(() => store.playingIndex)
    const eTime = ref('00:00')
    const viewDuration = ref('00:00')
    const duration = ref(0)
    const currentIcon = ref('play')

    watch(isPlaying, (currentValue, oldValue) => {
      console.log('test')
      if (isPlaying.value) { setPlayIcon('pause') } else {
        setPlayIcon('play')
      }
      viewDuration.value = convertTime(store.nowPlaying.duration)
      duration.value = store.nowPlaying.length
    })

    onMounted(async () => {
      volumeChange(25)
    })

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
      player.changeVolume(e)
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

    return {
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
      eTime,
      duration,
      volumeChange,
      playPause,
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
  background-color: rgba(255, 255, 255, 0.86);
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
  <main class="w-full text-sm bg-neutral text-neutral-content">
    <div
      class="flex flex-col items-center justify-center w-full pb-2"
      @click="toggleLyrics"
    >
      <div
        class="pb-2 progress-bar"
        @click.stop
      >
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
          :lazy="true"
          :silent="true"
          @change="seek"
        />
      </div>
      <div class="controls">
        <div class="playing">
          <div
            class="container"
            @click.stop
          >
            <img
              loading="lazy"
              :src="nowPlaying.cover"
              @click="$router.push({ path: `/AlbumDetails/${nowPlaying.albumId}` })"
            >
            <div
              class="track-info"
            >
              <div>
                <span
                  class="hover:cursor-pointer hover:underline"
                  @click="$router.push({ path: `/AlbumDetails/${nowPlaying.albumId}` })"
                >{{ nowPlaying.title }}</span>
              </div>
              <div class="artist">
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
        <div class="ml-32 mr-32 middle-control-buttons">
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
              class="px-4 py-2 mr-2 font-bold text-gray-800 co btn hover:bg-base-300"

              @click="previousTrack"
            >
              <font-awesome-icon
                icon="fast-backward"
                color="gray"
              />
            </button>
            <!-- Play Button -->
            <button
              class="px-4 py-2 font-bold co btn hover:bg-base-300"
              @click="playPause"
            >
              <font-awesome-icon
                :icon="currentIcon"
                color="gray"
              />
            </button>
            <!-- Next Button -->
            <button
              class="px-4 py-2 ml-2 font-bold text-gray-800 co btn hover:bg-base-300"
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
  </main>
</template>
