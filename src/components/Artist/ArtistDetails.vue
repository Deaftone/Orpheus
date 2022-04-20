<script>
import axios from 'axios'
import apollo from '../../utils/apiAxios'
export default {
  name: 'ArtistDetails',
  props: { id: { type: String, required: true } },
  data() {
    return {
      name: '',
      artistName: '',
      albums: [],
      artistImage: 'https://www.offset.com/images/v2/artist_bio_placeholder.png',
      artistBanner: '',
      bio: '',
    }
  },
  async mounted() {
    const data = (await apollo.server.get('/getArtist', {
      params: {
        id: this.id,
      },
    })).data
    this.artistName = data['subsonic-response'].artist.name
    const albumIndex = data['subsonic-response'].artist.album
    for (const album of albumIndex)
      this.albums.push({ id: album.id, title: album.title, cover: `https://navi.raspi.local/rest/getCoverArt?u=${apollo.server.defaults.params.u}&s=${apollo.server.defaults.params.s}&t=${apollo.server.defaults.params.t}&f=json&c=Orpheus&v=1.8.0&id=${album.id}&size=300` })

    const artistImage = await axios.get(`http://localhost:3001/${this.artistName}`)
    this.artistImage = artistImage.data.image
    this.bio = `${artistImage.data.bio.slice(0, 1435)}....`

    this.artistBanner = artistImage.data.banner
  },
}
</script>

<template>
  <div
    :style="{ 'background-image': 'url(' + artistBanner + ')' }"
    class="h-full bg-image "
  >
    <div
      class="h-full p-10 bg-filter "
    >
      <div class="card lg:card-side ">
        <figure>
          <img
            class="object-contain w-full h-96"
            :src="artistImage"
          >
        </figure>
        <div class="card-body">
          <h2 class="text-xl font-bold card-title lg:text-6xl ">
            {{ artistName }}
          </h2>
          <div class="card-actions text-primary">
            <a
              class="cursor-pointer"
            >{{ bio }}</a>
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
          @click=" $router.push({path: `/AlbumDetails/${album.id}`})
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
