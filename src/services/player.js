import { Howl, Howler } from 'howler'
import { usePlayerStore } from '@/stores/player'
import DeaftoneConnector from './deaftoneApi'

class Player {
  constructor () {
    this.howler = null
    this.playerStore = usePlayerStore()
    this.deaftone = new DeaftoneConnector()
    this.progress = 0
    this.init()
  }

  async init () {
    this.progressUpdate()
  }

  onEnd (instance) {
    console.log('PLAYER_SERVICE: TRACK_END')
  }

  play (track) {
    console.log(`PLAYER_SERVICE: PLAY_TRACK ${track}`)

    Howler.unload()
    this.howler = new Howl({
      src: [this.deaftone.stream(track.id)],
      html5: true,
      preload: true,
      format: ['flac'],
      onend: function () {
        this.nextTrack()
      }.bind(this)
    })
    this.howler.volume(this.playerStore.volume)
    this.howler.play()
    this.playerStore.setIsPlaying(true)
    this.playerStore.setNowPlaying(track)
    this.setMediaControls(track)
  }

  progressUpdate () {
    setInterval(() => {
      if (this.howler === null || !this.howler.playing()) return
      this.progress = this.howler.seek()
      this.playerStore.setProgress(this.progress)
    }, 100)
  }

  playQueue (queue) {
    this.playerStore.setQueue(queue)
    this.playerStore.setPlayingIndex(0)
    this.playerStore.setNowPlaying(queue[0])
    this.play(queue[0])
  }

  seekTrack (value) {
    this.howler.seek(value)
  }

  changeVolume (value) {
    this.playerStore.setVolume(value)
    this.howler.volume(value)
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
    this.playerStore.addToPQueue(this.playerStore.nowPlaying)
    this.playerStore.nextTrack()
    const track = this.playerStore.queue[this.playerStore.playingIndex]
    console.log(`PLAYER_SERVICE: PREVIOUS_TRACK ${JSON.stringify(track)}`)
    this.play(track)
  }

  previousTrack () {
    const track = this.playerStore.previousQueue.pop()
    this.playerStore.previousTrack()
    if (track) {
      console.log(`PLAYER_SERVICE: PREVIOUS_TRACK ${JSON.stringify(track)}`)
      this.playerStore.setNowPlaying(track)
      this.play(track)
    }
  }

  setMediaControls (track) {
    console.log(`PLAYER_SERVICE: SET_MEDIA_CONTROLS ${JSON.stringify(track)}`)

    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.title,
        artist: track.artist,
        album: track.album,
        artwork: [
          { src: track.cover || '', sizes: '256x256', type: 'image/png' }
        ]
      })

      navigator.mediaSession.setActionHandler('play', () => { this.togglePlay() })
      navigator.mediaSession.setActionHandler('pause', () => { this.togglePlay() })
      navigator.mediaSession.setActionHandler('previoustrack', () => { this.previousTrack() })
      navigator.mediaSession.setActionHandler('nexttrack', () => { this.nextTrack() })
    }
  }
}
export default Player
