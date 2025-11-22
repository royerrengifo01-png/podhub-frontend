<template>
  <nav class="navbar">
    <router-link to="/Home">Inicio</router-link>
    <router-link to="/Descubrir">Descubrir</router-link>

    <!-- SOLO ADMINS -->
    <router-link v-if="role === 'admin'" to="/SubirPodcast">Subir Podcast</router-link>

    <router-link to="/LikePodcasts">Mis Podcasts</router-link>
    <router-link to="/Profile">Perfil</router-link>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue"

const role = ref("")

onMounted(() => {
  role.value = localStorage.getItem("role") || "user"
})
</script>

<style>
.navbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #222;
  padding: 12px 0;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.navbar a:hover {
  text-decoration: underline;
}
</style>
