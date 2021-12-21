/* import { defineStore } from 'pinia'

export const playerStore = defineStore('player', {
  state: () => {
    return {
      previousPlaying: null,
      nowPlaying: null,
      queue: [],
      searchQuery: null,
      isPlaying: false,
      currentTheme: null
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    setNowPlaying (payload) {
      this.nowPlaying = payload
    },
    setPreviousPlaying (payload) {
      console.log(payload)
      this.previousPlaying = payload
    },
    setQueue (payload ) {
      this.queue = payload
    },
    addToQueue (payload) {
      this.queue.push(payload) 
    },
    setSearchQuery (payload) {
      this.searchQuery = payload 
    },
    setIsPlaying(payload){
      this.isPlaying = payload
    },
    setCurrentTheme(payload){
      this.currentTheme = payload
    }
  },
}) */

import { createStore } from 'vuex'

export const playerStore = createStore({
  state () {
    return {
      previousPlaying: null,
      nowPlaying: null,
      queue: [],
      previousQueue: [],
      playingIndex: 0,
      searchQuery: null,
      isPlaying: false,
      currentTheme: null
    }
  },
  mutations: {
    setNowPlaying (state, p) {
      state.nowPlaying = state.queue[p]
    },
    setPlayingIndex (state, p){
      state.playingIndex = p 
    },
    nextTrack (state, p){
      const tp = state.playingIndex + 1
      if(state.queue[tp]) state.playingIndex++

    },
    previousTrack (state, p){
      if(state.playingIndex > 0) state.playingIndex--
    },
    setPreviousPlaying (state, p) {
      state.previousPlaying = p
    },
    setQueue (state, p ) {
      state.queue = p
    },
    addToQueue (state, p) {
      state.queue.push(p) 
    },
    addToPQueue (state, p){
      state.previousQueue.push(p)
    },
    setSearchQuery (state, p) {
      state.searchQuery = p 
    },
    setIsPlaying(state, p){
      state.isPlaying = p
    },
    setCurrentTheme(state, p){
      state.currentTheme = p
    }
  },
  getters: {
    getLastPlayed: state => {
      console.log(state)
      return state.pop()
    },
  }
})
  