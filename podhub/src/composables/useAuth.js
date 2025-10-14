import { ref } from 'vue'

export const user = ref(null) // null = no logueado

export function loginUser(userData) {
  user.value = userData
}

export function logoutUser() {
  user.value = null
}
