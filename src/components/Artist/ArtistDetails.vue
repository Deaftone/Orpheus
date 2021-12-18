<template>
  <!--   <div class="relative">
    <div
      class="bg-fixed bg-image"
      style="background-image: url('https://www.umusic.ca/wp-content/uploads/2019/06/Billie-Eilish-banner.jpg');"
    />
    <div
      class="absolute top-0 p-20 pt-6"
    >
      <div class="card card-side text-neutral-content">
        <figure class="p-6">
          <img
            :src="artistImage"
            class="rounded-lg shadow-lg"
          >
        </figure> 
        <div class=" card-body">
          <h2 class="card-title">
            <span class="text-6xl font-bold">{{ artistName }}</span>
          </h2> 
          <p>{{ bio }}</p> 
        </div>
  </div>-->
  <!--       <div
        class="grid grid-cols-3 grid-rows-2"
        style="grid-template-columns:auto 1fr"
      >
        <div class="flex row-start-1 pr-10">
          <img
            class="border-2 border-gray-500 border-solid rounded-md"
            :src="artistImage"
          >
        </div>
        <div class="col-span-2 col-start-2 row-start-1 mt-10">
          <span class="text-6xl font-bold">{{ artistName }}</span>
          <p style="">
            {{ bio }}
          </p>
        </div>
  </div>-->
  <!--  </div>
    <div class="pt-3 pb-3 pl-40">
      <span class="text-2xl">Albums</span>
    </div>
    <div class="grid w-full grid-cols-1 gap-4 pb-10 pl-40 pr-40 md:grid-cols-6 lg:grid-cols-10">
      <div
        v-for="album in albums"
        :key="album.id"
        class="justify-center p-1 bg-gray-600 rounded-lg"
      >
        <div
          class="text-center"
          @click=" $router.push({path: `/AlbumDetails/${album.id}`})
          "
        >
          <img
            class="rounded-md"
            :src="album.cover"
          >
          <a>{{ album.title }}</a>
        </div>
      </div>
    </div>
  </div>-->
  <div class="p-5">
    <div
      id="banner"
      class="flex w-full px-4 py-5 bg-cover shadow-2xl card bg-base-200"
      :style="{ 'background-image': 'url(' + artistBanner + ')' }"
      style="background-position-y:-100px"
    >
      <div class="items-center card card-side text-neutral-content" style="height:600px" />
    </div>
  </div>
  <div class="h-64 p-10 card-body">
    <h2 class="card-title">{{ artistName }}</h2>
    <p>{{ bio }}</p>
  </div>
  <div class="divider" />
  <div class="pt-3 pb-3 pl-40">
    <span class="text-2xl">Albums</span>
  </div>
  <div class="grid w-full gap-4 pb-10 pl-40 pr-40 xl:grid-cols-8 lg:grid-cols-5 md:grid-cols-3">
    <div
      v-for="album in albums"
      :key="album.id"
      class="cursor-pointer"
      @click="$router.push({ path: `/AlbumDetails/${album.id}` })"
    >
      <div class="shadow-2xl">
        <img class="rounded-md" :src="album.cover" />
      </div>
      <a>{{ album.title }}</a>
    </div>
  </div>
</template>

<script>
import apiAxios from '../../utils/apiAxios'
import axios from 'axios'
export default {
  name: 'ArtistDetails',
  props: { id: { type: String, required: true } },
  data() {
    return {
      name: '',
      artistName: '',
      albums: [],
      artistImage: '',
      artistBanner: '',
      bio: '',
    }
  },
  async mounted() {
    const data = (await apiAxios.get('/getArtist', {
      params: {
        id: this.id
      }
    })).data
    this.artistName = data['subsonic-response']['artist'].name
    const albumIndex = data['subsonic-response']['artist']['album']
    for (const album of albumIndex) {
      this.albums.push({ id: album.id, title: album.title, cover: `https://navi.raspi.local/rest/getCoverArt?u=${apiAxios.defaults.params.u}&s=${apiAxios.defaults.params.s}&t=${apiAxios.defaults.params.t}&f=json&c=Orpheus&v=1.8.0&id=${album.id}&size=300` })
    }


    const artistImage = await axios.get(`http://localhost:3001/${this.artistName}`)
    this.artistImage = artistImage.data.image
    this.bio = artistImage.data.bio.slice(0, 1435) + '....'

    this.artistBanner = artistImage.data.banner
    console.log(artistImage.data)
  },
  methods: {
    imageLoaded(e) {
      const width = e.target.width
      const height = e.target.height
      console.log(`OHeight: ${height} OWidth: ${width}`)
      const displayPixels = 350

      const nHeight = e.target.naturalHeight
      const nWidth = e.target.naturalWidth
      let newHeight, newWidth

      if (nHeight > nWidth) {
        newHeight = displayPixels
        newWidth = Math.round((nWidth / nHeight) * displayPixels)
      } else {
        newWidth = displayPixels
        newHeight = Math.round((nHeight / nWidth) * displayPixels)
      }

      console.log(`Height: ${newHeight} Width: ${newWidth}`)
      e.target.width = newWidth
      e.target.height = newHeight
    },
  }
}
</script>

<style scoped>
.bg-image {
  filter: blur(7px);
  -webkit-filter: blur(7px);

  height: 500px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.info {
}
</style>


