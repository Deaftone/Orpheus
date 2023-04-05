<script>
import { inject, onUnmounted, reactive } from 'vue'
import AlbumCard from '@/components/Album/AlbumCard.vue'
import VLazyImage from 'v-lazy-image'

export default {
  name: 'ArtistDetails',
  components: { AlbumCard, VLazyImage },
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
      deaftone,
      albums
    }
  }
}
</script>

<template>
  <div class="grid select-none grid-cols-1 gap-3 px-10 py-6 text-sm lg:text-lg xl:px-40">
    <div class="flex justify-center">
      <div class="card w-full cursor-default bg-base-300 p-4 shadow-2xl md:card-side">
        <div class="w-72">
          <figure>
            <VLazyImage
              :src="info.artistImage"
              :src-placeholder="info.artistImage"
              class="justify-center rounded-xl object-contain sm:h-52 sm:w-52 md:h-72 md:w-72"
            />
          </figure>
        </div>

        <div class="py-0 md:card-body lg:w-1">
          <h2 class="card-title text-2xl font-bold text-primary md:text-5xl">
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
    <span class="text-2xl">Top Tracks</span>
    <div
      class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-5"
    >
      <div
        v-for="album in albums"
        :key="album.id"
        class="card tooltip tooltip-top rounded-lg bg-neutral transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
        :data-tip="album.name"
      >
        <div
          class="flex items-center"
        >
          <p class="p-1 text-primary">
            1
          </p>
          <VLazyImage
            :src="deaftone.getCover(album.id)"
            :src-placeholder="imgUrl"
            class="h-12 w-12 select-none rounded-lg p-1 "
          />

          <p class="truncate text-center ">
            top track
          </p>
        </div>
      </div>
    </div>
    <div class="divider" />
    <div>
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
