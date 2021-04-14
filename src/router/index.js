// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Test from '../components/Test.vue'

const routes = [
    {
        path: '/',
        name: 'Test',
        component: Test
    }
]

const router = createRouter({ history: createWebHistory(), routes })
export default router