<script>
import 'v3-infinite-loading/lib/style.css'
import imgUrl from '@/assets/unknown_album.jpg'
import { inject } from 'vue'
import VLazyImage from 'v-lazy-image'
export default {
  props: { id: { type: String, required: true }, name: { type: String, required: true } },
  components: { VLazyImage },

  setup (props) {
    const deaftone = inject('$deaftone')

    return {
      deaftone,
      imgUrl,
      props
    }
  }
}
</script>
<template>
  <div
    class="mx-auto transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
  >
    <VLazyImage
      src="https://www.offset.com/images/v2/artist_bio_placeholder.png"
      class="rounded-full shadow-xl ring ring-primary"
      style="width: auto; height: auto"
    />
    <div class="font-bold text-center">
      <p class="text-center truncate">
        {{ props.name }}
      </p>
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
</template>

<style scoped></style>
