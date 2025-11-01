<template>
  <nav class="navbar">
    <router-link to="/Home">Inicio</router-link>
    <router-link to="/Descubrir">Descubrir</router-link>
    <router-link to="/Profile">Perfil</router-link>
    <router-link to="/SubirPodcast">Subir Podcast</router-link>

  </nav>
</template>

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
