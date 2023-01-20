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
  <div class="grid grid-cols-1 gap-3 pt-6 pb-6 pl-10 pr-10 text-sm select-none xl:pr-40 xl:pl-40 lg:text-lg ">
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
      <div class="w-full p-4 shadow-2xl cursor-default bg-base-300 card md:card-side">
        <div class="w-72">
          <figure>
            <img
              class="object-contain w-full rounded-xl h-72"
              :src="info.artistImage"
            >
          </figure>
        </div>
        <div class="pt-0 pb-0 -mt-2 lg:w-1 lg:card-body">
          <h2 class="text-sm font-bold card-title lg:text-5xl text-primary">
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
    <div class="pt-3 pb-3 pl-30">
      <span class="text-2xl">Albums</span>
    </div>
    <div
      class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8"
    >
      <div
        v-for="album in albums"
        :key="album.id"
        class="bg-neutral tooltip tooltip-top card"
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
