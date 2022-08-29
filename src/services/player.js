import { Howl, Howler } from 'howler'
class Player {
  constructor () {
    this.howler = null
  }

  play (source) {
    Howler.unload()
    this.howler = new Howl({
      src: ['http://localhost:3030/stream/75b3486d-14ac-4c18-9025-e1fe8fd3d0c9'],
      html5: true,
      preload: true,
      format: ['flac']
    })
    console.log('Playing song')
    this.howler.play()
  }
}
export default Player
