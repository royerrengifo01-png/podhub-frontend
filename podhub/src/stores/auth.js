import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || ''
  }),
  actions: {
    async register(name, email, password) {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        name, email, password
      })
      alert('✅ Usuario registrado correctamente')
    },
    async login(email, password) {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email, password
      })
      this.token = res.data.token
      localStorage.setItem('token', this.token)
      alert('Inicio de sesión exitoso ✅')
      window.location.href = '/profile'
    },
  }
})
