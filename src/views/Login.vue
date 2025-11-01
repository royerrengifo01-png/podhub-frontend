<template>
  <div class="login-page">
    <div class="login-container">
      <!-- Columna izquierda -->
      <div class="login-left">
        <h3 class="greeting">¡Hola de nuevo!</h3>
        <p class="description">
          Para disfrutar de todos los beneficios y contenido exclusivo, por favor inicia sesión.
        </p>

        <h1 class="title">Inicia sesión</h1>

        <form @submit.prevent="login" class="login-form">
          <label>Correo electrónico</label>
          <input
            v-model="email"
            type="email"
            placeholder="Ingrese correo electrónico"
            required
          />

          <label>Contraseña</label>
          <input
            v-model="password"
            type="password"
            placeholder="Ingrese contraseña"
            required
          />

          <div class="register-link">
            ¿No tienes cuenta?
            <router-link to="/register">Regístrate aquí</router-link>
          </div>

          <button type="submit" class="login-button">
            {{ loading ? "Iniciando..." : "Inicia sesión" }}
          </button>

          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>
      </div>

      <!-- Columna derecha (imagen) -->
      <div class="login-right">
        <img src="@/assets/login.png" alt="Imagen de login" />
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios"
import { ref } from "vue"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const errorMessage = ref("")
const loading = ref(false)
const router = useRouter()

async function login() {
  loading.value = true
  errorMessage.value = ""
  try {
    const res = await axios.post("https://podhub-backend.onrender.com/api/login", {
      email: email.value,
      password: password.value,
    })
    localStorage.setItem("user", JSON.stringify(res.data))
    router.push("/Home")
  } catch (error) {
    errorMessage.value = "Correo o contraseña incorrectos."
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  background-color: #0d0f13;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Poppins", sans-serif;
}

.login-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  color: white;
}

.login-left {
  width: 45%;
}

.greeting {
  font-size: 1rem;
  color: #b5b5b5;
  margin-bottom: 10px;
}

.description {
  color: #a0a0a0;
  margin-bottom: 30px;
  line-height: 1.5;
}

.title {
  font-size: 2.3rem;
  margin-bottom: 40px;
  font-weight: 600;
}

.login-form {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 0.9rem;
  color: #ccc;
  margin-bottom: 8px;
}

input {
  background: transparent;
  border: 1px solid #444;
  color: white;
  padding: 12px 14px;
  margin-bottom: 25px;
  border-radius: 6px;
  outline: none;
}

input::placeholder {
  color: #777;
}

.register-link {
  color: #aaa;
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.register-link a {
  color: #e91e63;
  text-decoration: none;
  font-weight: 500;
}

.register-link a:hover {
  text-decoration: underline;
}

.login-button {
  background: linear-gradient(to right, #ff4f8b, #8b3dff);
  border: none;
  color: white;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

.login-button:hover {
  opacity: 0.85;
}

.error-message {
  color: #ff6b6b;
  font-size: 0.85rem;
  margin-top: 10px;
}

.login-right {
  width: 55%;
  display: flex;
  margin-top: -100px;
  justify-content: center;
}

.login-right img {
  width: 100%;
  max-width: 400px;
  border-radius: 20px;
}
</style>
