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
        baseURL: 'https://apollo.raspi.local',
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

  async getArtists () {
    return (await this.axios.get('/artists')).data
  }

  async getArtist (artistId) {
    return (await this.axios.get(`/artists/${artistId}`)).data
  }

  async getAlbums (size, page) {
    return await this.axios.get('/albums', {
      params: {
        size, page
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
