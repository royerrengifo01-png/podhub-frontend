import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Descubrir from '../views/Descubrir.vue'
import Profile from '../views/Profile.vue'
import SubirPodcast from '../views/SubirPodcast.vue'

const routes = [
  { path: '/', redirect: '/login' }, 
  { path: '/Home', component: Home },
  { path: '/Profile', component: Profile },
  { path: '/Descubrir', component: Descubrir },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/SubirPodcast', component: SubirPodcast }
  

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
