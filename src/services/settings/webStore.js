class WebStore {
  constructor () {

  }

  async set (setting, val) {
    console.log('test')
  }

  async get (setting) {
    return { value: 'http://localhost:3030' }
  }
}

export default WebStore
