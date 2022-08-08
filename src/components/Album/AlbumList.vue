<script>
import 'v3-infinite-loading/lib/style.css'
export default {
  name: 'AlbumList',
  components: {},
  inject: ['$deaftone'],
  props: {
    size: {
      type: Number,
      default: 56
    },
    scroller: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      albums: [],
      offset: 0,
      firstLoad: true
    }
  },
  computed: {
    filterAlbums () {
      /*       const query = this.$store.state.searchQuery
      if (query) {
        console.log(query)
        const albums = this.albums.filter((album) => {
          return album.name.toLowerCase().includes(String(query).toLowerCase())
        })
        return albums
      } */
      // else {
      console.log('Return full')
      return this.albums
      // }
    }
  },
  watch: {
    searchQuery (query) {
      console.log(query)
    }
  }, // injecting in a component that wants it
  created () {
    this.observer = new IntersectionObserver(this.onElementObserved, {
      root: null,
      threshold: 0.9
    })
  },
  async mounted () {
    // await this.getAlbums()
    console.log(this.$refs.sticky)
    if (this.scroller) this.observer.observe(this.$refs.sticky)
    else this.getAlbums()
  },
  methods: {
    truncateString (str, num) {
      if (str.length > num) return `${str.slice(0, num)}...`
      else return str
    },
    async getAlbums () {
      const data = await this.$deaftone.getAlbums(this.size)
      console.log(data.data)
      for (const album of data.data) {
        this.albums.push({
          name: album.name,
          id: album.id,
          cover: album.cover
        })
      }
      /*       for (const album of data)
        console.log(album) */
    },
    onElementObserved (e) {
      e.forEach(({ target, isIntersecting }) => {
        this.getAlbums()
      })
    }
  }
}
</script>
<template>
  <div class="m-5">
    <div
      id="list"
      class="grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8"
    >
      <div
        v-for="album in filterAlbums"
        :key="album.id"
        class="transition duration-300 ease-in-out delay-150 shadow-xl rounded-xl bg-neutral card hover:-translate-y-1 hover:scale-105"
        @click="$router.push({ path: `/AlbumDetails/${album.id}` })"
      >
        <div>
          <div class="overflow-hidden">
            <img
              :src="$deaftone.getCover(album.id)"
              style="width: auto; height: auto"
            >

            <div class="justify-center pt-5 pb-5 card-body">
              <p class="text-center">
                {{ truncateString(album.name, 18) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      ref="sticky"
      class
      style="height: 0.1px"
    />
  </div>
</template>

<style scoped></style>
