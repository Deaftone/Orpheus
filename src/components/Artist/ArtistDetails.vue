<script>
import { inject, onMounted, reactive } from 'vue'

export default {
  name: 'ArtistDetails',
  props: { id: { type: String, required: true } },
  setup(props) {
    const $deaftone = inject('$deaftone')
    const info = reactive({})
    const albums = reactive([])
    info.artistImage = 'https://www.offset.com/images/v2/artist_bio_placeholder.png'
    onMounted(async () => {
      const data = await $deaftone.getArtist(props.id)
      console.log(data.name)
      for (const album of data.albums)
        albums.push({ id: album.id, title: album.name, cover: 'https://e.snmc.io/i/600/w/39e1badce8994960bfb051184dacea0b/7585491/pierre-bourne-the-life-of-pierre-4-Cover-Art.jpg' })

      // const artistImage = await $deaftone.axios.get(`http://localhost:3001/${info.artistName}`)
      // console.log(artistImage)
      // info.artistImage = artistImage.data.image
      // info.bio = `${artistImage.data.bio.slice(0, 1435)}....`
      info.artistImage = data.image
      info.bio = data.bio
      info.artistName = data.name
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
    class="h-full bg-image bg-[url(https://media.vogue.co.uk/photos/60898f2d9825ee933d17acfb/2:3/w_2240,c_limit/Billie%20Eilish%20insert_02.jpg)]"
  >
    <div
      class="h-full p-10 bg-filter"
    >
      <div class="card lg:card-side ">
        <figure>
          <img
            class="object-contain"
            style="width:320px;height:320px"
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
          class="rounded shadow-xl bg-neutral "
          @click=" $router.push({ path: `/AlbumDetails/${album.id}` })
          "
        >
          <div>
            <div class="overflow-hidden ">
              <img
                style="width:auto;height:auto"
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

  background-size: cover;
  background-attachment: fixed;

}
.bg-filter {
  backdrop-filter: blur(7px) brightness(30%);
}
</style>
