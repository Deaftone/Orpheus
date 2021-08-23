<template>  
  <div class="grid w-full grid-cols-1 gap-4 p-5 md:grid-cols-6 lg:grid-cols-10 ">
    <div 
      v-for="artist in artists"
      :key="artist.id"
      class="shadow-xl card image-full h-52"
      @click=" $router.push({path: `/ArtistDetails/${artist.id}`})
      "
    >
      <figure>
        <img src="https://e-cdn-images.dzcdn.net/images/artist/8b6e535e08ad7c5cb312102a5ede6c1e/264x264-000000-80-0-0.jpg">
      </figure> 
      <div class="justify-end card-body">
        <div class="text-center transition-opacity" />
        <h2 class="text-center card-title">
          {{ artist.name }}
        </h2> 
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

