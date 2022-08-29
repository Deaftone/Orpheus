import { Howl, Howler } from 'howler'
import { usePlayerStore } from '../stores/player'
import { DeaftoneConnector } from './deaftoneApi'
class Player {
  constructor () {
    this.howler = null
    this.playerStore = usePlayerStore()
    this.deaftone = new DeaftoneConnector()
  }

  play (track) {
    Howler.unload()
    this.howler = new Howl({
      src: [this.deaftone.stream(track.id)],
      html5: true,
      preload: true,
      format: ['flac'],
      onend: this.onEnd
    })
    this.howler.play()
    this.playerStore.setIsPlaying(true)
    this.playerStore.setNowPlaying(track)
  }

  onEnd () {
    console.log('PLAYER_SERVICE: TRACK_END')
    this.playerStore.nextTrack()
  }

  pause () {
    this.howler.pause()
    this.playerStore.setIsPlaying(false)
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
  }

  nextTrack () {
    const previousTrack = this.playerStore.previousQueue.pop()
    if (previousTrack) {
      console.log(`PLAYER_SERVICE: NEXT_TRACK ${JSON.stringify(previousTrack)}`)
    }
  }

  previousTrack () {}
}
export default Player
