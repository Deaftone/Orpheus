import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    previousPlaying: {},
    nowPlaying: {},
    queue: [],
    previousQueue: [],
    playingIndex: 0,
    searchQuery: null,
    isPlaying: false,
    progress: 0,
    volume: 1
  }),

  actions: {
    setVolume (payload) {
      this.volume = payload
    },
    setProgress (payload) {
      this.progress = payload
    },
    setNowPlaying (payload) {
      this.nowPlaying = payload
    },
    setPreviousPlaying (payload) {
      this.previousPlaying = payload
    },
    setQueue (payload) {
      this.queue = payload
    },
    addToQueue (payload) {
      this.queue.push(payload)
    },
    addToPQueue (payload) {
      this.previousQueue.push(payload)
    },
    setSearchQuery (payload) {
      this.searchQuery = payload
    },
    setIsPlaying (payload) {
      this.isPlaying = payload
    },
    setPlayingIndex (payload) {
      this.playingIndex = payload
    },
    setCurrentTheme (payload) {
      this.currentTheme = payload
    },
    previousTrack () {
      if (this.playingIndex > 0) { this.playingIndex-- }
    },
    nextTrack () {
      const tp = this.playingIndex + 1
      if (this.queue[tp]) { this.playingIndex++ }
    }
  }
})
