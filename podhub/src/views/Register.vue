<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card width="400">
      <v-card-title class="text-h5">Registro</v-card-title>
      <v-card-text>
        <v-text-field label="Nombre" v-model="name" />
        <v-text-field label="Correo" v-model="email" />
        <v-text-field label="Contraseña" type="password" v-model="password" />
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="register">Registrar</v-btn>
      </v-card-actions>
      <v-card-subtitle class="text-center">
        ¿Ya tienes cuenta?
        <router-link to="/login">Inicia sesión</router-link>
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')

const register = async () => {
  try {
    const res = await fetch('https://podhub-backend.onrender.com/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.value, email: email.value, password: password.value })
    })
    const data = await res.json()
    if (res.ok) {
      alert('Usuario registrado. Por favor inicia sesión.')
      router.push('/login')
    } else {
      alert(data.error)
    }
  } catch (err) {
    alert('Error de conexión con el servidor')
  }
}
</script>

