import axios from 'axios'
const apiAxios = axios.create({
  baseURL: 'https://navi.raspi.local/rest/',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
  },
  params: {
    u: 'doom',
    t: '57447d1e0c77a04388d4cf5745b520ec',
    s: '558dbf',
    f: 'json',
    c: 'Orpheus',
    v: '1.8.0'
  }
})

const getCover = function (id) {
  return `https://navi.raspi.local/rest/getCoverArt?u=${apiAxios.defaults.params.u}&s=${apiAxios.defaults.params.s}&t=${apiAxios.defaults.params.t}&f=json&c=Orpheus&v=1.8.0&id=${id}`
}


export default apiAxios