import axios from 'axios'
import axiosTauriAdapter from 'axios-tauri-adapter'
const userName = import.meta.env.VITE_USERNAME
const token = import.meta.env.VITE_TOKEN
const s = import.meta.env.VITE_S

class DeaftoneConnector {
  constructor () {
    console.log(userName)
    this.axios = axios.create({
      adapter: window.__TAURI__ ? axiosTauriAdapter : null,
      baseURL: 'https://apollo.raspi.local',
      timeout: 5000,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  async getArtists () {
    return (await this.axios.get('/artists')).data
  }

  async getArtist (artistId) {
    return (await this.axios.get(`/artists/${artistId}`)).data
  }

  async getAlbums (size, offset) {
    /*  return (await this.axios.get('/getAlbumList', {
      params: {
        type: 'newest',
        size,
        offset,
      },
    })).data */
    return await this.axios.get('/albums', {
      params: {
        size, offset
      }
    })
  }

  async getArtistAlbum (albumId) {
    return (await this.axios.get(`/albums/${albumId}`, {
      params: {
        id: albumId
      }
    })).data
  }

  stream (id) {
    return `${this.axios.defaults.baseURL}/stream/${id}`
  }

  async getArtistAlbums (artistId) {
    return (await this.axios.get('/getAlbum', {
      params: {
        id: artistId
      }
    })).data
  }

  getCover (id) {
    return `https://apollo.raspi.local/albums/${id}/cover`
    // return `https://navi.raspi.local/rest/getCoverArt?u=${this.axios.defaults.params.u}&s=${this.axios.defaults.params.s}&t=${this.axios.defaults.params.t}&f=json&c=Orpheus&v=1.8.0&id=${id}`
  }
}

export default DeaftoneConnector
