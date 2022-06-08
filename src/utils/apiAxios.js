import axios from 'axios'
class ApolloConnector {
  constructor() {
    this.axios = axios.create({
      baseURL: 'https://navi.raspi.local/rest/',
      timeout: 1000,
      headers: { 'Content-Type': 'application/json' },
      params: {
        u: '***REMOVED***',
        t: '***REMOVED***',
        s: '558dbf',
        f: 'json',
        c: 'Orpheus',
        v: '1.8.0',
      },
    })
  }

  async getArtists() {
    return (await this.axios.get('/getArtists')).data
  }

  async getArtist(artistId) {
    return (await this.axios.get('/getArtist', {
      params: {
        id: artistId,
      },
    })).data
  }

  async getAlbums(size, offset) {
    return (await this.axios.get('/getAlbumList', {
      params: {
        type: 'newest',
        size,
        offset,
      },
    })).data
  }

  async getArtistAlbums(artistId) {
    return (await this.axios.get('/getAlbum', {
      params: {
        id: artistId,
      },
    })).data
  }

  getCover(id) {
    return `https://navi.raspi.local/rest/getCoverArt?u=${this.axios.defaults.params.u}&s=${this.axios.defaults.params.s}&t=${this.axios.defaults.params.t}&f=json&c=Orpheus&v=1.8.0&id=${id}`
  }
}

export default ApolloConnector
