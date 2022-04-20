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

  getCover(id) {
    return `https://navi.raspi.local/rest/getCoverArt?u=${this.axios.defaults.params.u}&s=${this.axios.defaults.params.s}&t=${this.axios.defaults.params.t}&f=json&c=Orpheus&v=1.8.0&id=${id}`
  }
}

export default ApolloConnector
