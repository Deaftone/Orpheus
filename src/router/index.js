// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import ArtistList from '../components/Artist/ArtistList.vue'
import AlbumDetails from '../components/Album/AlbumDetails.vue'

import Home from '../components/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }, 
  {
    path: '/artistList',
    name: 'ArtistList',
    component: ArtistList
  },
  {
    path: '/AlbumDetails',
    name: 'AlbumDetails',
    component: AlbumDetails
  }
]

const router = createRouter({ history: createWebHistory(), routes })
export default router