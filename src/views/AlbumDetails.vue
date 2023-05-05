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
    info.artistId = data.artist_id
    info.year = data.year
    info.albumId = data.id
    info.albumDescription = data.album_description
    info.cover = deaftone.getCover(data.id)
    info.songCount = 0
    let totalDuration = 0
    for (const song of data.songs) {
      info.songCount++
      totalDuration = totalDuration + song.length
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
        length: song.length,
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
  <div class="grid select-none grid-cols-1 gap-3 px-10 py-6 text-sm lg:text-lg xl:px-40">
    <div class="flex justify-center">
      <div class="card w-full cursor-default bg-base-300 p-4 shadow-2xl md:card-side">
        <div class="w-72">
          <figure>
            <VLazyImage
              :src="deaftone.getCover(info.albumId)"
              :src-placeholder="deaftone.getCover(info.albumId)"
              class="justify-center rounded-xl object-contain sm:h-52 sm:w-52 md:h-72 md:w-72"
            />
          </figure>
        </div>
        <div class="-m-2 py-0 md:card-body lg:w-1">
          <h2 class="card-title text-2xl font-bold md:text-5xl">
            {{ info.title }}
          </h2>
          <div class="card-title text-xl lg:text-3xl">
            <p>
              <a
                class="cursor-pointer text-primary hover:underline"
                @click="$router.push({ path: `/ArtistDetails/${info.artistId}` })"
              >{{ info.artist }}</a>
              <br>
              <a
                class="gap-0 text-sm line-clamp-4 hover:cursor-pointer"
                id="albumDescription"
                @click="toggleText"
              >{{ info.albumDescription }} </a>
              <br>
              <a class="text-primary">{{ info.year }} | {{ info.songCount }} Songs | {{ info.totalDuration }}</a>
            </p>
          </div>
          <div
            class=""
          >
            <button class="btn-primary btn">
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
    <div class="flex w-full flex-col place-items-center justify-center gap-5">
      <div
        v-for="song in songs"
        :id="song.id"
        :key="song.number"
        class="flex w-full cursor-pointer justify-center rounded-lg bg-base-300 p-1 hover:bg-neutral "
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
            class="float-right mr-5 hidden rounded-lg border-4 border-solid border-primary px-1 lg:visible"
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
