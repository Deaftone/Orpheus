<script>
import { inject, onMounted, reactive } from 'vue'

export default {
  name: 'ArtistDetails',
  props: { id: { type: String, required: true } },
  setup(props) {
    const $apollo = inject('$apollo')
    const info = reactive({})
    const albums = reactive([])
    info.artistImage = 'https://www.offset.com/images/v2/artist_bio_placeholder.png'
    onMounted(async () => {
      const data = await $apollo.getArist(props.id)
      info.artistName = data['subsonic-response'].artist.name
      info.albumIndex = data['subsonic-response'].artist.album
      for (const album of info.albumIndex)
        albums.push({ id: album.id, title: album.title, cover: `https://navi.raspi.local/rest/getCoverArt?u=${$apollo.axios.defaults.params.u}&s=${$apollo.axios.defaults.params.s}&t=${$apollo.axios.defaults.params.t}&f=json&c=Orpheus&v=1.8.0&id=${album.id}&size=300` })

      const artistImage = await $apollo.axios.get(`http://localhost:3001/${info.artistName}`)
      info.artistImage = artistImage.data.image
      info.bio = `${artistImage.data.bio.slice(0, 1435)}....`

      info.artistBanner = info.artistImage.data.banner
    })

    return {
      info,
      albums,
    }
  },
}
</script>

<template>
  <div
    :style="{ 'background-image': `url(${info.artistBanner})` }"
    class="h-full bg-image "
  >
    <div
      class="h-full p-10 bg-filter "
    >
      <div class="card lg:card-side ">
        <figure>
          <img
            class="object-contain w-full h-96"
            :src="info.artistImage"
          >
        </figure>
        <div class="card-body">
          <h2 class="text-xl font-bold card-title lg:text-6xl ">
            {{ info.artistName }}
          </h2>
          <div class="card-actions text-primary">
            <a
              class="cursor-pointer"
            >{{ info.bio }}</a>
          </div>
        </div>
      </div>
      <div class="divider" />
      <div class="pt-3 pb-3 pl-30">
        <span class="text-2xl">Albums</span>
      </div>
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
        <div
          v-for="album in albums"
          :key="album.id"
          class="rounded shadow-xl bg-neutral w-94 h-94 "
          @click=" $router.push({ path: `/AlbumDetails/${album.id}` })
          "
        >
          <div>
            <div class="max-w-sm overflow-hidden ">
              <img
                class="w-96 h-94"
                style="width:200px;height:200px"
                :src="album.cover"
              >
              <div class="justify-center p-4">
                <a class="text-center text-clip overflow-hidden ...">
                  {{ album.title }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-image {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.bg-filter {
  backdrop-filter: blur(7px) brightness(30%);
}
</style>
