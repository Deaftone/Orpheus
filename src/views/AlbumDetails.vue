<script>
import {
  computed,
  inject,
  nextTick,
  reactive,
  ref,
  watch
} from 'vue'
import { usePlayerStore } from '@/stores/player'
import VLazyImage from 'v-lazy-image'

export default {
  components: { VLazyImage },
  name: 'AlbumDetails',
  props: { id: { type: String, required: true } },
  async setup (props) {
    const deaftone = inject('$deaftone')
    const player = inject('$player')

    const store = usePlayerStore()
    const sticky = ref(null)
    const albumBar = ref(null)
    const info = reactive({})
    const songs = reactive([])
    const nowPlaying = computed(() => store.nowPlaying)
    watch(nowPlaying, (newValue, oldPlaying) => {
      highLightNowPlaying(oldPlaying, newValue)
    })
    const data = await deaftone.getArtistAlbum(props.id)
    console.log(data)
    info.title = data.name
    info.artist = data.artist
    info.artistId = data.artistId
    info.year = data.year
    info.albumId = data.id
    info.albumDescription = data.albumDescription
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
        length: song.duration,
        liked: song.liked
      })
    }

    info.totalDuration = (new Date(totalDuration * 1000).toISOString().substr(14, 5))

    /*     const observer = new IntersectionObserver(onElementObserved, {
      root: null,
      threshold: 0.9
    }) */

    function playTrack (title, id) {
      // Get clicked song index
      const index = this.songs.findIndex((x) => x.id === id)
      // Slice songs at picked index
      const _songs = this.songs.slice(index, this.songs.length)
      player.playQueue(_songs)
    }

    /*     function onElementObserved (e) {
      e.forEach(({ target, isIntersecting }) => {
        albumBar.value.classList.toggle('bg-base-200', !isIntersecting)
      })
    } */
    function toggleText () {
      const albumDescription = document.getElementById('albumDescription')
      albumDescription.classList.toggle('line-clamp-4')
    }
    function highLightNowPlaying (oldPlaying, newPlaying) {
      let oldP

      if (oldPlaying) oldP = document.getElementById(oldPlaying.id)

      const newP = document.getElementById(newPlaying.id)

      if (oldP) {
        oldP.classList.remove(
          'text-primary',
          'bg-neutral-focus',
          'font-bold'
        )
      }

      if (newP) {
        newP.classList.add(
          'text-primary',
          'bg-neutral-focus',
          'font-bold'
        )
      }
    }
    // observer.observe(sticky.value)

    // Check if currently playing song in in this track list. If so save and highlight it
    nextTick(() => {
      // if (tempPlaying) { highLightNowPlaying(null, tempPlaying) }
    })
    /*     onUnmounted(() => {
      observer.disconnect()
    }) */

    return {
      nowPlaying,
      playTrack,
      albumBar,
      deaftone,
      toggleText,
      // onElementObserved,
      highLightNowPlaying,
      sticky,
      songs,
      info
    }
  }
}
</script>

<template>
  <div class="grid grid-cols-1 gap-3 pt-6 pb-6 pl-10 pr-10 text-sm select-none xl:pr-40 xl:pl-40 lg:text-lg">
    <div class="flex justify-center">
      <div class="w-full p-4 shadow-2xl cursor-default bg-base-300 card md:card-side">
        <div>
          <figure>
            <VLazyImage
              :src="deaftone.getCover(info.albumId)"
              :src-placeholder="deaftone.getCover(info.albumId)"
              class="object-contain md:w-72 md:h-72 sm:w-52 sm:h-52 rounded-xl"
            />
          </figure>
        </div>
        <div class="pt-0 pb-0 lg:w-1 md:card-body">
          <h2 class="text-2xl font-bold card-title md:text-5xl">
            {{ info.title }}
          </h2>
          <div class="text-xl card-title lg:text-3xl">
            <p>
              <a
                class="cursor-pointer hover:underline text-primary"
                @click="$router.push({ path: `/ArtistDetails/${info.artistId}` })"
              >{{ info.artist }}</a>
              <br>
              <a
                class="gap-0 text-m line-clamp-4 hover:cursor-pointer"
                id="albumDescription"
                @click="toggleText"
              >{{ info.albumDescription }} </a>
              <br>
              <a class="text-primary">{{ info.year }} | {{ info.songCount }} Songs | {{ info.totalDuration }}</a>
            </p>
          </div>
          <div
            class="mt-5 card-actions"
            style="margin-top:auto"
          >
            <button class="btn btn-primary">
              Play
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="divider" />
    <div
      ref="sticky"
      style="height: 0.1px"
    />
    <div class="flex flex-col justify-center w-full gap-5 place-items-center">
      <div
        v-for="song in songs"
        :id="song.id"
        :key="song.number"
        class="flex justify-center w-full p-1 rounded-lg cursor-pointer bg-base-300 hover:bg-neutral "
        @click="playTrack(song.title, song.id)"
      >
        <div class="w-full p-2">
          <div class="float-left pr-3">
            <a>{{ song.number }}</a>
          </div>
          <div class="float-left ">
            <a>{{ song.title }}</a>
          </div>
          <div class="float-right ">
            <a>{{ (new Date(song.length * 1000).toISOString().substr(14, 5)) }}</a>
          </div>
          <div
            class="hidden float-right pl-1 pr-1 mr-5 border-4 border-solid rounded-lg border-primary lg:visible"
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

.line-clamp-4 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* truncate to 4 lines */
  -webkit-line-clamp: 4;
}

</style>
