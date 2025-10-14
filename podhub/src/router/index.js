import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Discover from '../views/Discover.vue'
import Favorites from '../views/Favorites.vue'
import Search from '../views/Search.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/discover', component: Discover },
  { path: '/favorites', component: Favorites },
  { path: '/search', component: Search },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/profile', component: Profile }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard para rutas privadas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const protectedRoutes = ['/profile', '/favorites']
  
  if (protectedRoutes.includes(to.path) && !token) {
    return next('/login') // redirige al login si no hay sesión
  }
  next()
})

export default router
