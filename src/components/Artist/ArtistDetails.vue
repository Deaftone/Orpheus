<template>
  <div class="relative">
    <div class="bg-fixed bg-image" />
    <div
      class="absolute top-0 p-20 pt-14"
    >
      <div
        class="grid grid-cols-3 grid-rows-2"
        style="grid-template-columns:auto 1fr"
      >
        <div class="h-16 col-start-1 row-span-2 pr-20">
          <img
            class="border-2 border-gray-500 border-solid rounded-md h-96"
            src="https://assets.vogue.com/photos/609bb445758287e5e091eeed/master/w_2240,c_limit/Billie-Eilish-Happier-Than-Ever.jpeg"
          >
        </div>
        <div class="h-16 col-span-2 col-start-2 row-start-2 ">
          <span class="text-6xl font-bold">{{ artistName }}</span>
        </div>
        <div class="h-16 col-start-2 row-start-3 ">
          <span>California-bred singer/songwriter Billie Eilish crafts genre-blurring outcast anthems that bridge the gap between ethereal indie electronic and dark alternative pop. With angsty, introspective lyrics that don't shy away from issues of mental health, she endeared herself to a devoted audience during her breakthrough years in the late 2010s when she was still just a teenager. On the heels of a sold-out headlining tour, she issued her chart-topping, Grammy-winning debut album, 2019's When We All Fall Asleep, Where Do We Go? In 2021, she returned with her sophomore set, Happier Than Ever. </span>
        </div>
      </div>
    </div>

    <div class="grid w-full grid-cols-1 gap-4 pt-10 pl-40 pr-40 md:grid-cols-6 lg:grid-cols-10">
      <div
        v-for="album in albums"
        :key="album.id"
        class="flex justify-center p-1 bg-gray-600 rounded-lg"
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
      artistName: '',
      albums: [],
    }
  },
  async mounted(){
    const data = (await axios.get('/getArtist', {params: {
      id: this.id
    }})).data
    this.artistName = data['subsonic-response']['artist'].name
    const albumIndex = data['subsonic-response']['artist']['album']
    for(const album of albumIndex){
      this.albums.push({id: album.id, title: album.title, cover: `http://192.168.1.13:4533/rest/getCoverArt?u=${axios.defaults.params.u}&s=${axios.defaults.params.s}&t=${axios.defaults.params.t}&f=json&c=Orpheus&v=1.8.0&id=${album.id}&size=300`})
    }
  }
}
</script>

<style scoped>
.bg-image {
  background-image: url("https://www.umusic.ca/wp-content/uploads/2019/06/Billie-Eilish-banner.jpg");
  
  filter: blur(5px);
  -webkit-filter: blur(5px);
  
  height: 500px; 
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.info {

}
</style>


