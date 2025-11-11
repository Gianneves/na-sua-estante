import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '@/views/Dashboard.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: {requiresAuth: true} }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

 
  if (to.meta.requiresAuth && !token) {
    return next({ name: 'Home' }) 
  }


  next()
})

export default router
