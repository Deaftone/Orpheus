<template>  
  <div class="m-5">
    <div
      id="list"
      class="grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-7"
    >
      <div 
        v-for="album in filterAlbums"
        :key="album.id"
        class="rounded shadow-xl bg-neutral card"
        @click=" $router.push({path: `/AlbumDetails/${album.id}`})
        "
      >
        <div>  
          <div class="overflow-hidden">
            <figure>
              <img
                :src="album.cover"
                style="width:244px;height:244px"
              >
            </figure>
            <div class="justify-center card-body">
              <p class="text-center text-ellipsis overflow-hidden ...">
                {{ truncateString(album.name, 18) }}
              </p> 
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      ref="sticky"
      class=""
      style="height:0.1px"
    />
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
     //await this.getAlbums()
     console.log(this.$refs.sticky)
      this.observer.observe(this.$refs.sticky)
  }, 
  methods:{
    truncateString(str, num) {
      if (str.length > num) {
        return str.slice(0, num) + "...";
      } else {
        return str;
      }
    },
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
      e.forEach(({ target, isIntersecting}) => {
        this.getAlbums()
      })
    },
  },
  
}
</script>

<style scoped>

</style>

