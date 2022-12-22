<script>
import { inject, onMounted, ref } from 'vue'
import ArtistCard from '@/components/Artist/ArtistCard.vue'
export default {
  components: { ArtistCard },
  props: {
    size: {
      type: Number,
      default: 56
    },
    sort: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const deaftone = inject('$deaftone')
    const artists = ref([])
    onMounted(async () => {
      const data = await deaftone.getArtists(props.size, props.sort)
      for (const artist of data) { artists.value.push({ name: artist.name, id: artist.id }) }
    })
    return { artists }
  }
}
</script>

<template>
  <div class="grid w-full grid-cols-3 gap-4 p-5 xl:grid-cols-11 lg:grid-cols-6">
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

<style scoped>

</style>
