// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import ArtistList from '@/views/ArtistList.vue'
import AlbumDetails from '@/views/AlbumDetails.vue'
import AlbumList from '@/views/AlbumList.vue'
import ArtistDetails from '@/views/ArtistDetails.vue'
import Home from '@/views/Home.vue'
import TestVue from '@/views/Test.vue'
import Settings from '@/views/Settings.vue'
import SplashScreen from '@/views/SplashScreen.vue'
import AppInit from '@/views/AppInit.vue'
import { setupLayouts } from 'virtual:generated-layouts'

const routes = setupLayouts([
  {
    path: '/',
    name: 'SplashScreen',
    component: SplashScreen,
    meta: {
      layout: 'Test'
    }
  },
  {
    path: '/init',
    name: 'AppInit',
    component: AppInit,
    meta: {
      layout: 'Test'
    }
  },
  {
    path: '/home',
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
    path: '/Settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/TestVue',
    name: 'TestVue',
    component: TestVue,
    props: true
  }
])

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior (to, from, savedPosition) {
    setTimeout(async function () { document.getElementById('main').scroll({ top: 0 }) }, 300)
  },
  routes
})
export default router
