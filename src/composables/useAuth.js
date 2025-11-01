import { ref } from "vue"

const user = ref(null)
const token = ref(localStorage.getItem("token") || null)

function saveToken(tkn) {
  token.value = tkn
  localStorage.setItem("token", tkn)
}

function logout() {
  token.value = null
  user.value = null
  localStorage.removeItem("token")
}

function isAuthenticated() {
  return !!token.value
}

export function useAuth() {
  return { user, token, saveToken, logout, isAuthenticated }
}
