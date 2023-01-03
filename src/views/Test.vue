<script>
import {
  inject,
  reactive
} from 'vue'
export default {
  name: 'TestVue',
  async setup (props) {
    const player = inject('$player')
    const deaftone = inject('$deaftone')
    const info = {}
    const songs = reactive([])

    const data = await deaftone.getArtistAlbum('dc816c90-5742-4eb9-babc-2d73e969a97d')
    console.log(data)
    info.title = data.name
    info.artist = data.artist
    info.artistId = data.artistId
    info.year = data.year
    info.albumId = data.id
    info.albumDescription = data.albumDescription
    info.cover = deaftone.getCover(data.id)
    info.songCount = 0
    let totalDuration = 0
    for (const song of data.songs) {
      info.songCount++
      totalDuration = totalDuration + song.duration
      songs.push({
        id: song.id,
        number: song.track,
        title: song.title,
        cover: info.cover,
        albumName: info.title,
        artistId: info.artistId,
        albumId: info.albumId,
        artist: info.artist,
        type: 'test',
        length: song.duration,
        liked: song.liked
      })
    }
    function playTrack () {
      // Get clicked song index
      // Slice songs at picked index
      const _songs = this.songs.slice(4, songs.length)
      player.playQueue(_songs)
    }

    return playTrack
  }
}
</script>

<template>
  <div
    class="h-full bg-image bg-[url(https://media.vogue.co.uk/photos/60898f2d9825ee933d17acfb/2:3/w_2240,c_limit/Billie%20Eilish%20insert_02.jpg)]"
  >
    <div
      class="min-h-full p-10 bg-filter"
    >
      <div class="grid grid-cols-5 gap-2 overflow-hidden auto-rows-auto ">
        <div
          class="h-32 min-w-full min-h-full text-gray-100 rounded "
          @click="playTrack()"
        >
          10
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-image {

  background-size: cover;
  background-attachment: fixed;

}
.bg-filter {
  backdrop-filter: blur(7px) brightness(30%);
}
</style>
