// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Test from '../components/Test.vue'
import Artists from '../components/Artists.vue'
import Home from '../components/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    }, 
    {
        path: '/test',
        name: 'Test',
        component: Test
    },
    {
        path: '/arists',
        name: 'Artists',
        component: Artists
    }
]

const router = createRouter({ history: createWebHistory(), routes })
export default router