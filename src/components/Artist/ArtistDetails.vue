<template>  
  <div class="grid w-full grid-cols-1 gap-4 p-5 md:grid-cols-6 lg:grid-cols-10">
    <div
      v-for="album in albums"
      :key="album.id"
      class="flex justify-center p-1 rounded-lg bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
    >
      <div
        class="text-center"
        @click=" $router.push({path: `/AlbumDetails/${album.id}`})
        "
      >
        <img
          class="rounded-full"
          :src="album.cover"
        >
        <a>{{ album.title }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../utils/apiAxios'
export default {
  name: 'ArtistDetails',
  props: {id: {type: String, required: true}},
  data() {
    return {
      name: '',
      albums: [],
    }
  },
  async mounted(){
    const data = (await axios.get('/getArtist', {params: {
      id: this.id
    }})).data
    const albumIndex = data['subsonic-response']['artist']['album']
    for(const album of albumIndex){
      this.albums.push({id: album.id, title: album.title, cover: `http://192.168.1.13:4533/rest/getCoverArt?u=${axios.defaults.params.u}&s=${axios.defaults.params.s}&t=${axios.defaults.params.t}&f=json&c=Orpheus&v=1.8.0&id=${album.id}&size=300`})
    }
  }
}
</script>

<style scoped>

</style>

