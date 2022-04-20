<script>
import { onMounted, ref } from 'vue'
import axios from '../../utils/apiAxios'
export default {
  props: {
    size: {
      type: Number,
      default: 56,
    },
  },
  setup(props) {
    const artists = ref([])
    onMounted(async() => {
      const data = (await axios.get('/getArtists')).data
      const artistIndex = data['subsonic-response'].artists.index
      for (const index of artistIndex) {
        for (const artist of index.artist)
          artists.value.push({ name: artist.name, id: artist.id })
      }
    })
    return { artists }
  },
}
</script>
<template>
  <div class="grid w-full grid-cols-3 gap-4 p-5 xl:grid-cols-11 lg:grid-cols-6">
    <div
      v-for="artist in artists.slice(0, size)"
      :key="artist.id"
      class="mx-auto transition duration-300 ease-in-out delay-150 hover:-translate-y-1 hover:scale-105"
      @click=" $router.push({path: `/ArtistDetails/${artist.id}`})
      "
    >
      <img
        class="rounded-full shadow-xl ring ring-primary"
        src="https://www.offset.com/images/v2/artist_bio_placeholder.png"
      >
      <div class="font-bold text-center">
        <a>{{ artist.name }}</a>
      </div>
    </div>
    <!--     <div
      v-for="artist in artists"
      :key="artist.id"
      class="flex justify-center p-1 transition-opacity rounded-lg bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
      @click=" $router.push({path: `/ArtistDetails/${artist.id}`})
      "
    >

    </div> -->
  </div>
</template>

<style scoped>

</style>
