// src/stores/authStore.js
import { defineStore } from "pinia"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
    userId: localStorage.getItem("userId") || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.role === "admin",
  },

  actions: {
    login(data) {
      this.token = data.token
      this.role = data.user.role
      this.userId = data.user.id

      localStorage.setItem("token", data.token)
      localStorage.setItem("role", data.user.role)
      localStorage.setItem("userId", data.user.id)
    },

    logout() {
      this.token = null
      this.role = null
      this.userId = null

      localStorage.removeItem("token")
      localStorage.removeItem("role")
      localStorage.removeItem("userId")
    },
  },
})
