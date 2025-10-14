<template>
  <v-container class="text-center fill-height d-flex flex-column align-center justify-center">
    <v-card width="400">
      <v-card-title class="text-h5">Perfil del usuario</v-card-title>
      <v-card-text v-if="profile">
        <p><strong>Nombre:</strong> {{ profile.name }}</p>
        <p><strong>Correo:</strong> {{ profile.email }}</p>
      </v-card-text>
      <v-card-text v-else>
        Cargando...
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { user } from '../composables/useAuth.js'

const profile = ref(null)

onMounted(async () => {
  if (!user.value) return

  try {
    const res = await fetch('https://podhub-backend.onrender.com/api/profile', {
      headers: { 'Authorization': 'Bearer ' + user.value.token }
    })
    if (res.ok) {
      const data = await res.json()
      profile.value = data
    } else {
      alert('Error al obtener el perfil')
    }
  } catch (err) {
    alert('Error de conexión con el servidor')
  }
})
</script>
