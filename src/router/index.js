// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import ArtistList from '../components/Artist/ArtistList.vue'
import AlbumDetails from '../components/Album/AlbumDetails.vue'
import AlbumList from '../components/Album/AlbumList.vue'
import ArtistDetails from '../components/Artist/ArtistDetails.vue'
import Home from '../components/Home.vue'
import TestVue from '../components/Test.vue'
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
    name: 'AlbumList',
    component: AlbumList
  },
  {
    path: '/AlbumDetails/:id',
    name: 'AlbumDetails',
    component: AlbumDetails,
    props: true
  },

  {
    path: '/ArtistDetails/:id',
    name: 'ArtistDetails',
    component: ArtistDetails,
    props: true
  },
  {
    path: '/TestVue',
    name: 'TestVue',
    component: TestVue,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior (to, from, savedPosition) {
  // always scroll to top
    return { top: 0 }
  },
  routes
})
export default router
