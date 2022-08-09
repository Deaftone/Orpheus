// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import ArtistList from '../views/ArtistList.vue'
import AlbumDetails from '../views/AlbumDetails.vue'
import AlbumList from '../views/AlbumList.vue'
import ArtistDetails from '../views/ArtistDetails.vue'
import Home from '../views/Home.vue'
import TestVue from '../views/Test.vue'
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
