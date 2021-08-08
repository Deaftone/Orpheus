import axios from 'axios'
const apiAxios = axios.create({
  baseURL: 'http://192.168.1.18:4533/rest/',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
  params: { 
    u: '***REMOVED***',
    t: '***REMOVED***',
    s: '558dbf',
    f: 'json',
    c: 'Orpheus',
    v: '1.8.0'
  }
})

const getCover = function (id){
  return `http://192.168.1.18:4533/rest/getCoverArt?u=${apiAxios.defaults.params.u}&s=${apiAxios.defaults.params.s}&t=${apiAxios.defaults.params.t}&f=json&c=Orpheus&v=1.8.0&id=${id}`
}


export default apiAxios