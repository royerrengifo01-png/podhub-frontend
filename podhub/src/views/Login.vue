<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card width="400">
      <v-card-title class="text-h5">Iniciar sesión</v-card-title>
      <v-card-text>
        <v-text-field label="Correo" v-model="email" />
        <v-text-field label="Contraseña" type="password" v-model="password" />
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="login">Entrar</v-btn>
      </v-card-actions>
      <v-card-subtitle class="text-center">
        ¿No tienes cuenta?
        <router-link to="/register">Regístrate</router-link>
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginUser } from '../composables/useAuth.js'

const router = useRouter()
const email = ref('')
const password = ref('')

const login = async () => {
  try {
    const res = await fetch('https://podhub-backend.onrender.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    })
    const data = await res.json()
    if (res.ok) {
      loginUser({ ...data.user, token: data.token }) // actualiza estado global
      router.push('/') // redirige al inicio
    } else {
      alert(data.error)
    }
  } catch (err) {
    alert('Error de conexión con el servidor')
  }
}
</script>
