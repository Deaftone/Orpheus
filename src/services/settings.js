import { Store } from 'tauri-plugin-store-api'

class SettingsManager {
  constructor () {
    this.store = new Store('.settings.dat')
    // this.init()
  }

  init () {
    this.set('volume', { value: 0.5 }).then((value) => {
      console.log(value)
    })
    this.get('volume').then((value) => {
      console.log(value)
    })
  }

  async set (setting, val) {
    await this.store.set(setting, { value: val })
  }

  async get (setting) {
    const { value } = await this.store.get(setting)
    return value
  }
}

export default SettingsManager
