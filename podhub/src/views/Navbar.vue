<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>PodHub</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn text to="/">Inicio</v-btn>
    <v-btn text to="/discover">Descubrir</v-btn>

    <!-- Si NO está logueado -->
    <template v-if="!user">
      <v-btn text to="/login">Iniciar sesión</v-btn>
      <v-btn text to="/register">Registrarse</v-btn>
    </template>

    <!-- Si está logueado -->
  <template v-else>
    <v-btn text to="/profile">Perfil</v-btn>
  </template>
  </v-app-bar>
</template>

<script setup>
import { user, logoutUser } from '../composables/useAuth.js'
import { useRouter } from 'vue-router'
const router = useRouter()

const handleLogout = () => {
  logoutUser()
  router.push('/login')
}
</script>
