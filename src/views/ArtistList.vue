<script>
import { inject, onMounted, ref } from 'vue'
import ArtistCard from '@/components/Artist/ArtistCard.vue'
export default {
  components: { ArtistCard },
  props: {
    size: {
      type: Number,
      default: 66
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
  setup (props) {
    const deaftone = inject('$deaftone')
    const artists = ref([])
    const page = ref(0)
    let observer = null

    async function getArtists () {
      const data = await deaftone.getArtists(props.size, page.value)
      page.value++
      for (const artist of data) { artists.value.push({ name: artist.name, id: artist.id }) }
    }

    function onElementObserved (e) {
      e.forEach(({ target, isIntersecting }) => {
        getArtists()
      })
    }
    onMounted(async () => {
      observer = new IntersectionObserver(onElementObserved, {
        root: null,
        threshold: 0.9
      })
      if (props.scroller) observer.observe(document.getElementById('sticky'))
      else getArtists()
    })
    return { artists }
  }
}
</script>

<template>
  <div class="grid w-full grid-cols-3 gap-4 p-5 lg:grid-cols-6 xl:grid-cols-11">
    <div
      v-for="artist in artists"
      :key="artist.id"
      @click=" $router.push({ path: `/ArtistDetails/${artist.id}` })
      "
    >
      <ArtistCard
        :id="artist.id"
        :name="artist.name"
      />
    </div>
    <div
      id="sticky"
      class
      style="height: 0.1px"
    />
  </div>
</template>

<style scoped>

</style>
