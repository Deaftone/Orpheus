<script>
import 'v3-infinite-loading/lib/style.css'
import AlbumCard from '@/components/Album/AlbumCard.vue'

export default {
  name: 'AlbumList',
  components: { AlbumCard },
  inject: ['$deaftone'],
  props: {
    size: {
      type: Number,
      default: 56
    },
    sort: {
      type: String,
      default: ''
    },
    scroller: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      albums: [],
      page: 0,
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
      const data = await this.$deaftone.getAlbums(this.size, this.page)
      this.page++

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
        @click="$router.push({ path: `/AlbumDetails/${album.id}` })"
      >
        <AlbumCard
          :id="album.id"
          :name="album.name"
        />
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
