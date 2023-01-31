<script>
import { inject, onUnmounted, reactive } from 'vue'
import AlbumCard from '@/components/Album/AlbumCard.vue'

export default {
  name: 'ArtistDetails',
  components: { AlbumCard },
  props: { id: { type: String, required: true } },
  async setup (props) {
    onUnmounted(async () => {
      document.documentElement.style.setProperty('--bg-image', '')
      document.getElementById('filter').classList.remove('bg-filter')
    })
    const deaftone = inject('$deaftone')
    const info = reactive({})
    const albums = reactive([])
    info.artistImage =
      'https://www.offset.com/images/v2/artist_bio_placeholder.png'
    info.bio = 'Unknown'
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

    return {
      info,
      albums
    }
  }
}
</script>

<template>
  <div class="grid select-none grid-cols-1 gap-3 px-10 py-6 text-sm lg:text-lg xl:px-40">
    <!--  <div class="p-4 shadow-2xl cursor-default bg-base-300 card md:card-side">

      <figure>
        <img
          class="w-full rounded-xl h-72"
          :src="info.artistImage"
        >
      </figure>
      <div class="w-full card-body">
        <h2 class="text-xl font-bold card-title lg:text-6xl text-primary">
          {{ info.artistName }}
        </h2>
        <div class="w-full card-actions ">
          <p class="text-xl truncate cursor-pointer">
            {{ info.bio }}
          </p>
        </div>
      </div>
    </div> -->
    <div class="flex justify-center">
      <div class="card w-full cursor-default bg-base-300 p-4 shadow-2xl md:card-side">
        <div class="w-72">
          <figure>
            <img
              class="h-72 w-full rounded-xl object-contain"
              :src="info.artistImage"
            >
          </figure>
        </div>
        <div class="-mt-2 py-0 lg:w-1 lg:card-body">
          <h2 class="card-title text-sm font-bold text-primary lg:text-5xl">
            {{ info.artistName }}
          </h2>
          <div class="card-title ">
            <p class="line-clamp-6">
              {{ info.bio }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="divider" />
    <div class="py-3 ">
      <span class="text-2xl">Albums</span>
    </div>
    <div
      class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8"
    >
      <div
        v-for="album in albums"
        :key="album.id"
        class="card tooltip tooltip-top bg-neutral"
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
