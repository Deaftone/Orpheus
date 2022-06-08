import axios from 'axios'
const userName = import.meta.env.VITE_USERNAME
const token = import.meta.env.VITE_TOKEN
const s = import.meta.env.VITE_S
class ApolloConnector {
  constructor() {
    console.log(userName)
    this.axios = axios.create({
      baseURL: 'https://navi.raspi.local/rest/',
      timeout: 1000,
      headers: { 'Content-Type': 'application/json' },
      params: {
        u: userName,
        t: token,
        s,
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
