import { createStore } from 'vuex'

export const store = createStore({
  state () {
    return {
      nowPlaying: null
    }
  },
  mutations: {
    setNowPlaying (state, p) {
      state.nowPlaying = p
    }
  }
})
  