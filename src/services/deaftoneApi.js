import axios from 'axios'
import {
  buildWebStorage, defaultHeaderInterpreter, defaultKeyGenerator, setupCache
} from 'axios-cache-interceptor'
import axiosTauriAdapter from 'axios-tauri-adapter'
class DeaftoneConnector {
  constructor () {
    /*     this.axios = axios.create({
      adapter: window.__TAURI__ ? axiosTauriAdapter : null, this.cache],
      baseURL: 'https://apollo.raspi.local',
      timeout: 5000,
      headers: { 'Content-Type': 'application/json' }
    }) */
    this.cacheStorage = buildWebStorage(localStorage, 'axios-cache:')
    this.axios = setupCache(
      // axios instance
      axios.create({
        adapter: window.__TAURI__ ? axiosTauriAdapter : null,
        baseURL: 'http://localhost:3030',
        timeout: 5000,
        headers: { 'Content-Type': 'application/json' }
      }),

      // All options with their default values
      {
        // The storage to save the cache data. There are more available by default.
        //
        // https://axios-cache-interceptor.js.org/#/pages/storages
        storage: this.cacheStorage,

        // The mechanism to generate a unique key for each request.
        //
        // https://axios-cache-interceptor.js.org/#/pages/request-id
        generateKey: defaultKeyGenerator,

        // The mechanism to interpret headers (when cache.interpretHeader is true).
        //
        // https://axios-cache-interceptor.js.org/#/pages/global-configuration?id=headerinterpreter
        headerInterpreter: defaultHeaderInterpreter,

        // The function that will receive debug information.
        // NOTE: For this to work, you need to enable development mode.
        //
        // https://axios-cache-interceptor.js.org/#/pages/development-mode
        // https://axios-cache-interceptor.js.org/#/pages/global-configuration?id=debug
        debug: undefined
      }
    )
  }

  async testConnection () {
    // Delete cache before testiing the call
    await this.axios.storage.remove('test-connection')
    return (await this.axios.get('/', {
      id: 'test-connection'
    }))
  }

  async getArtists (limit, sort) {
    return (await this.axios.get('/artists', {
      params: {
        limit, sort
      }
    })).data
  }

  async getArtist (artistId) {
    return (await this.axios.get(`/artists/${artistId}`)).data
  }

  async likeSong (songId) {
    const song = (await this.axios.post(`/songs/${songId}/like`)).data
    return song
  }

  async getAlbums (size, page, sort) {
    return await this.axios.get('/albums', {
      params: {
        size, page, sort
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

  streamTranscode (id) {
    return `${this.axios.defaults.baseURL}/stream/transcode/${id}`
  }

  getCover (id) {
    return `${this.axios.defaults.baseURL}/albums/${id}/cover`
  }
}

export default DeaftoneConnector
