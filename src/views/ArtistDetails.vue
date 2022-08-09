<script>
import { inject, onMounted, onUnmounted, reactive } from 'vue'
import AlbumCard from '../components/Album/AlbumCard.vue'

export default {
  name: 'ArtistDetails',
  components: { AlbumCard },
  props: { id: { type: String, required: true } },
  setup (props) {
    const deaftone = inject('$deaftone')
    const info = reactive({})
    const albums = reactive([])
    info.artistImage =
      'https://www.offset.com/images/v2/artist_bio_placeholder.png'
    info.bio = 'Unknown'
    onMounted(async () => {
      const data = await deaftone.getArtist(props.id)
      if (data.image) {
        document.documentElement.style.setProperty(
          '--bg-image',
          `url('${data.image}')`
        )
        document.getElementById('filter').classList.toggle('bg-filter')
      }
      for (const album of data.albums) {
        const cover = deaftone.getCover(album.id)
        albums.push({
          id: album.id,
          name: album.name,
          cover
        })
      }
      if (data.image) info.artistImage = data.image
      if (data.bio) info.bio = data.bio
      info.artistName = data.name
    }).bind(this)
    onUnmounted(async () => {
      document.documentElement.style.setProperty('--bg-image', '')
      document.getElementById('filter').classList.remove('bg-filter')
    })

    return {
      info,
      albums
    }
  }
}
</script>

<template>
  <div class="p-10">
    <div class="card lg:card-side">
      <figure>
        <img
          class="object-contain"
          style="width: 320px; height: 320px"
          :src="info.artistImage"
        >
      </figure>
      <div class="card-body">
        <h2 class="text-xl font-bold card-title lg:text-6xl">
          {{ info.artistName }}
        </h2>
        <div class="card-actions text-primary">
          <a class="cursor-pointer">{{ info.bio }}</a>
        </div>
      </div>
    </div>
    <div class="divider" />
    <div class="pt-3 pb-3 pl-30">
      <span class="text-2xl">Albums</span>
    </div>
    <div
      class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8"
    >
      <div
        v-for="album in albums"
        :key="album.id"
        class="rounded shadow-xl bg-neutral tooltip tooltip-top"
        :data-tip="album.name"
        @click="$router.push({ path: `/AlbumDetails/${album.id}` })"
      >
        <AlbumCard
          :id="album.id"
          :name="album.name"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>