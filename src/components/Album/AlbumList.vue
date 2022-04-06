<template>  
  <div class="m-5">
    <div
      id="list"
      class="grid gap-5 resultgrid-cols-1 result sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8"
    >
      <div 
        v-for="album in filterAlbums"
        :key="album.id"
        class="shadow-xl w-94 h-94 card image-full "
        @click=" $router.push({path: `/AlbumDetails/${album.id}`})
        "
      >
        <figure>
          <img :src="album.cover">
        </figure>
        <div class="justify-center card-body">
          <div class="text-center transition-opacity" />
          <a class="text-center text-clip overflow-hidden ... w-24 h-24">
            {{ album.name }}
          </a> 
        </div>
      </div>

      <div
        ref="sticky"
        class=""
        style="height:0.1px"
      />
    </div>
  </div>
</template>

<script>
import axios from '../../utils/apiAxios'
import "v3-infinite-loading/lib/style.css";
export default {
  name: 'AlbumList',
    components: {
  },
  data() {
    return {
      albums: [],
      offset: 0,
      firstLoad: true,
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
  created() {
    this.observer = new IntersectionObserver(
      this.onElementObserved, 
      {
        root: null,
        threshold: 0.9,
      }
    )
  },
   async mounted(){
         this.observer.observe(this.$refs.sticky)

/*     const data = (await axios.get('/getAlbumList', {params: {
      type: 'newest',
      size: 50
    }})).data
    const albums = data['subsonic-response']['albumList']['album']
    for(const album of albums){
      this.albums.push({name: album.title, id: album.id, cover: `https://navi.raspi.local/rest/getCoverArt?u=${axios.defaults.params.u}&s=${axios.defaults.params.s}&t=${axios.defaults.params.t}&f=json&c=Orpheus&v=1.8.0&id=${album.id}&size=300`})
    }
    this.offset += 50 */
  }, 
  methods:{
    async getAlbums(){

      console.log('Got album call')
      console.log(this.offset)
      const data = (await axios.get('/getAlbumList', {params: {
        type: 'newest',
        size: 56,
        offset: this.offset
      }})).data
      const albums = data['subsonic-response']['albumList']['album']
      for(const album of albums){
        this.albums.push({name: album.title, id: album.id, cover: `https://navi.raspi.local/rest/getCoverArt?u=${axios.defaults.params.u}&s=${axios.defaults.params.s}&t=${axios.defaults.params.t}&f=json&c=Orpheus&v=1.8.0&id=${album.id}&size=300`})
      }
      this.offset += 56
    },
    onElementObserved(e) {
      e.forEach(() => {
        this.getAlbums()
      })
    },
  },
  
}
</script>

<style scoped>

</style>

