<script>
import 'v3-infinite-loading/lib/style.css'
import AlbumCard from '@/components/Album/AlbumCard.vue'
import { inject, onMounted, ref } from 'vue'

export default {
  name: 'AlbumList',
  components: { AlbumCard },
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
  async setup (props) {
    const deaftone = inject('$deaftone')
    const albums = ref([])
    const page = ref(0)
    let observer = null
    function searchQuery (query) {
      console.log(query)
    }

    function truncateString (str, num) {
      if (str.length > num) return `${str.slice(0, num)}...`
      else return str
    }

    function filterAlbums () {
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
    async function getAlbums () {
      const data = await deaftone.getAlbums(props.size, props.page, props.sort)
      for (const album of data.data) {
        albums.value.push({
          name: album.name,
          id: album.id,
          cover: album.cover
        })
      }
    }
    function onElementObserved (e) {
      e.forEach(({ target, isIntersecting }) => {
        getAlbums()
      })
    }
    onMounted(async () => {
      observer = new IntersectionObserver(onElementObserved, {
        root: null,
        threshold: 0.9
      })
      if (props.scroller) observer.observe(document.getElementById('sticky'))
      else this.getAlbums()
    })
    return {
      albums,
      page
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
        v-for="album in albums"
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
      id="sticky"
      class
      style="height: 0.1px"
    />
  </div>
</template>

<style scoped></style>
