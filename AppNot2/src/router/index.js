import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/createView',
      name: 'CreateView',
      component: () => import('../views/CreateView.vue')
    },
    {
      path: '/EditView/:id',
      name: 'EditView',
      component: () => import('../views/EditView.vue')
    },
    {
      path: '/Note/:id',
      name: 'Note',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/NoteView.vue')
    }
  ]
})

export default router
