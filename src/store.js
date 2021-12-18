import {
  createStore
} from 'vuex'

export const store = createStore({
  state() {
    return {
      previousPlaying: null,
      nowPlaying: null,
      queue: [],
      searchQuery: null,
      isPlaying: false,
      currentTheme: null
    }
  },
  mutations: {
    setNowPlaying(state, p) {
      state.nowPlaying = p
    },
    setPreviousPlaying(state, p) {
      state.previousPlaying = p
    },
    setQueue(state, p) {
      state.queue = p
    },
    addToQueue(state, p) {
      state.queue.push(p)
    },
    setSearchQuery(state, p) {
      state.searchQuery = p
    },
    setIsPlaying(state, p) {
      state.isPlaying = p
    },
    setCurrentTheme(state, p) {
      state.currentTheme = p
    }
  }
})