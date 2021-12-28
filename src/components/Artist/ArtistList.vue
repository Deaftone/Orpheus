<template>  
  <div class="grid w-full grid-cols-3 gap-4 p-5 xl:grid-cols-11 lg:grid-cols-6">
    <div 
      v-for="artist in artists"
      :key="artist.id"
      class="mx-auto"
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

<script>
import axios from '../../utils/apiAxios'
export default {
  name: 'AristsList',
  data() {
    return {
      artists: [],
    }
  },
  async mounted(){
    const data = (await axios.get('/getArtists')).data
    const artistIndex = data['subsonic-response']['artists']['index']
    for(const index of artistIndex){
      for(const artist of index.artist) {
        console.log(artist)
        this.artists.push({name: artist.name, id: artist.id})
      }
    }
  },
}
</script>

<style scoped>

</style>

