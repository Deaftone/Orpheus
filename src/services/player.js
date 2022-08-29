import { Howl, Howler } from 'howler'
import { usePlayerStore } from '../stores/player'
import { watch } from 'vue'

class Player {
  constructor () {
    this.howler = null
    this.playerStore = usePlayerStore()

    watch(this.playerStore.nowPlaying, (newValue, oldValue) => {
      console.log(`Now playing old ${oldValue}`)
      console.log(`Now playing update ${newValue}`)
      /*       console.log(newValue.cover)
      // playTrack(newValue)
      setMediaControls(newValue.title, newValue.artist, newValue.albumName, newValue.cover)
      store.setNowPlaying(newValue) */
    })
  }

  play (source) {
    Howler.unload()
    this.howler = new Howl({
      src: [source],
      html5: true,
      preload: true,
      format: ['flac']
    })
    this.togglePlay()
  }

  togglePlay () {
    if (this.howler.playing()) {
      console.log('PLAYER_SERVICE: PAUSE')

      this.howler.pause()
      this.playerStore.setIsPlaying(false)
    } else {
      console.log('PLAYER_SERVICE: PLAYING')
      this.howler.play()
      this.playerStore.setIsPlaying(true)
    }
    // return this.howler.playing() ? this.howler.pause() : this.howler.play()
  }
}
export default Player
