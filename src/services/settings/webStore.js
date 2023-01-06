class WebStore {
  constructor () {

  }

  async set (setting, val) {
    console.log('test')
  }

  async get (setting) {
    return { value: 'http://192.168.1.2:3030' }
  }
}

export default WebStore
