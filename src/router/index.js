import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import Login from '../views/LoginView.vue'
import Register from '../views/RegisterView.vue'
import Descubrir from '../views/DescubrirView.vue'
import Profile from '../views/ProfileView.vue'
import SubirPodcast from '@/views/SubirPodcastView.vue'
import PodcastPlayView from '@/views/PodcastPlayView.vue'

const routes = [
  { path: '/', redirect: '/login' }, 
  { path: '/Home', component: Home },
  { path: '/Profile', component: Profile },
  { path: '/Descubrir', component: Descubrir },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/SubirPodcast', component: SubirPodcast },
{
  path: "/podcast/:id",
  name: "PodcastPlay",
  component: () => import("../views/PodcastPlayView.vue")
}


]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
