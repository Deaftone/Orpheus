import { createStore } from 'vuex'

export const store = createStore({
  state () {
    return {
      previousPlaying: null,
      nowPlaying: null,
      queue: []
    }
  },
  mutations: {
    setNowPlaying (state, p) {
      state.nowPlaying = p
    },
    setPreviousPlaying (state, p) {
      state.previousPlaying = p
    },
    setQueue (state, p ) {
      state.queue = p
    },
    addToQueue (state, p) {
      state.queue.push(p) 
    }
  }
})
  