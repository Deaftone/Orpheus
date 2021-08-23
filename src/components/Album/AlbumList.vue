<template>  
  <div class="grid grid-cols-1 gap-4 p-5 md:grid-cols-6 lg:grid-cols-10">
    <div 
      v-for="album in filterAlbums"
      :key="album.id"
      class="shadow-xl h-52 card image-full "
      @click=" $router.push({path: `/AlbumDetails/${album.id}`})
      "
    >
      <figure>
        <img
          :src="album.cover"
          width="300px"
          height="300px"
        >
      </figure> 
      <div class="justify-end card-body">
        <div class="text-center transition-opacity" />
        <h3 class="text-center card-title">
          <a>{{ album.name }}</a>
        </h3> 
      </div>
    </div> 
  </div>
</template>

<script>
import axios from '../../utils/apiAxios'
export default {
  name: 'AlbumList',
  data() {
    return {
      albums: [],
    }
  },
  computed:{
    filterAlbums () {
      const query = this.$store.state.searchQuery
      if(query) {
        console.log(query)
        const albums = this.albums.filter(function(album) {
          return album.name.toLowerCase().includes(String(query).toLowerCase())

        })
        return albums
      } else {
        console.log('Return full')
        return this.albums
      }

    }
  },
  watch: {
    searchQuery (query) {
      console.log(query)
    }
  },
  async mounted(){
    const data = (await axios.get('/getAlbumList', {params: {
      type: 'newest',
      size: 500
    }})).data
    const albums = data['subsonic-response']['albumList']['album']
    for(const album of albums){
      this.albums.push({name: album.title, id: album.id, cover: `http://192.168.1.18:4533/rest/getCoverArt?u=${axios.defaults.params.u}&s=${axios.defaults.params.s}&t=${axios.defaults.params.t}&f=json&c=Orpheus&v=1.8.0&id=${album.id}&size=300`})
    }
  },
}
</script>

<style scoped>

</style>

