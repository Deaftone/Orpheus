<script>
import {
  computed,
  inject,
  nextTick,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch
} from 'vue'
import { usePlayerStore } from '../stores/player'

export default {
  name: 'AlbumDetails',
  props: { id: { type: String, required: true } },
  setup (props) {
    const deaftone = inject('$deaftone')
    const player = inject('$player')

    const store = usePlayerStore()
    const sticky = ref(null)
    const albumBar = ref(null)
    const info = reactive({})
    const songs = reactive([])
    const nowPlaying = computed(() => store.nowPlaying)
    const observer = new IntersectionObserver(onElementObserved, {
      root: null,
      threshold: 0.9
    })
    watch(nowPlaying, (newValue, oldPlaying) => {
      highLightNowPlaying(oldPlaying, newValue)
    })
    function playTrack (title, id) {
      // Get clicked song index
      const index = this.songs.findIndex((x) => x.id === id)
      // Slice songs at picked index
      const _songs = this.songs.slice(index, this.songs.length)
      player.playQueue(_songs)
    }

    function onElementObserved (e) {
      e.forEach(({ target, isIntersecting }) => {
        albumBar.value.classList.toggle('bg-base-200', !isIntersecting)
      })
    }

    function highLightNowPlaying (oldPlaying, newPlaying) {
      let oldP

      if (oldPlaying) oldP = document.getElementById(oldPlaying.id)

      const newP = document.getElementById(newPlaying.id)

      if (oldP) {
        oldP.classList.remove(
          'gradient-border',
          'border-solid',
          'border-4',
          'border-primary',
          'font-bold'
        )
      }

      if (newP) {
        newP.classList.add(
          'gradient-border',
          'border-solid',
          'border-4',
          'border-primary',
          'font-bold'
        )
      }
    }
    onMounted(async () => {
      observer.observe(sticky.value)
      const data = await deaftone.getArtistAlbum(props.id)
      info.title = data.name
      info.artist = data.artist
      info.artistId = data.artistId
      info.year = data.year
      info.albumId = data.id
      info.cover = deaftone.getCover(data.id)
      info.songCount = 0
      let totalDuration = 0
      for (const song of data.songs) {
        info.songCount++
        totalDuration = totalDuration + song.duration
        songs.push({
          id: song.id,
          number: song.track,
          title: song.title,
          cover: info.cover,
          albumName: info.title,
          artistId: info.artistId,
          albumId: info.albumId,
          artist: info.artist,
          type: 'test',
          length: song.duration
        })
      }

      info.totalDuration = (new Date(totalDuration * 1000).toISOString().substr(14, 5))
    })
    // Check if currently playing song in in this track list. If so save and highlight it
    nextTick(() => {
      // if (tempPlaying) { highLightNowPlaying(null, tempPlaying) }
    })
    onUnmounted(() => {
      observer.disconnect()
    })

    return {
      nowPlaying,
      playTrack,
      albumBar,
      onElementObserved,
      highLightNowPlaying,
      sticky,
      songs,
      info
    }
  }
}
</script>

<template>
  <div class="grid grid-cols-1 gap-5 pt-10 pb-10">
    <div class="justify-center pl-10 pr-10 lg:pr-40 lg:pl-40 lg:block">
      <div class="card lg:card-side bg-base-300">
        <figure>
          <img
            class="object-contain w-full h-72"
            :src="info.cover"
          >
        </figure>
        <div class="card-body">
          <h2 class="text-xl font-bold card-title lg:text-5xl">
            {{ info.title }}
          </h2>
          <div class="card-actions text-primary">
            <p>
              {{ info.songCount }} tracks | {{ info.year }} | {{ info.totalDuration }} <br><br><a
                class="cursor-pointer"
                @click="$router.push({ path: `/ArtistDetails/${info.artistId}` })"
              >{{ info.artist }}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      ref="sticky"
      style="height: 0.1px"
    />
    <!-- Bug where the currently playing track is above this in z-index -->
    <div
      ref="albumBar"
      class="sticky top-0 w-full p-1 pl-5 pr-5 -mt-5 text-sm lg:pl-40 lg:pr-40 bg-base-200 z-1"
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
        class="flex justify-center p-1 text-lg transition duration-300 ease-in-out delay-150 rounded-lg shadow cursor-pointer bg-base-300 hover:scale-105"
        @click="playTrack(song.title, song.id)"
      >
        <div class="w-full p-2">
          <div class="float-left pr-3">
            <a>{{ song.number }}</a>
          </div>
          <div class="float-left">
            <a>{{ song.title }}</a>
          </div>
          <div class="float-right">
            <a>{{ (new Date(song.length * 1000).toISOString().substr(14, 5)) }}</a>
          </div>
          <div
            class="float-right pl-1 pr-1 mr-5 text-sm border-4 border-solid rounded-lg border-primary"
          >
            <a>{{ song.type }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
