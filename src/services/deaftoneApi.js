import axios from 'axios'
import axiosTauriAdapter from 'axios-tauri-adapter'
const userName = import.meta.env.VITE_USERNAME

class DeaftoneConnector {
  constructor () {
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

  async getArtistAlbums (artistId) {
    return (await this.axios.get('/getAlbum', {
      params: {
        id: artistId
      }
    })).data
  }

  stream (id) {
    return `${this.axios.defaults.baseURL}/stream/${id}`
  }

  getCover (id) {
    return `${this.axios.defaults.baseURL}/albums/${id}/cover`
  }
}

export default DeaftoneConnector
