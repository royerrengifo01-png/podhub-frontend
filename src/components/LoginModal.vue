<template>
  <div class="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
    <div class="bg-gray-900 p-6 rounded-2xl w-96 shadow-lg border border-gray-800">
      <h2 class="text-xl font-semibold mb-4 text-center">Iniciar sesión</h2>
      <form @submit.prevent="loginUser" class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Correo electrónico"
          class="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Contraseña"
          class="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none"
          required
        />
        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition"
        >
          Entrar
        </button>
      </form>

      <p class="text-center text-gray-400 mt-4">
        ¿No tienes cuenta?
        <a @click="register" class="text-blue-400 hover:underline cursor-pointer">Regístrate</a>
      </p>
      <button @click="$emit('close')" class="absolute top-3 right-4 text-gray-400 hover:text-white">
        ✖
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const emit = defineEmits(["close", "logged"])
const email = ref("")
const password = ref("")

async function loginUser() {
  const res = await fetch("https://podhub-backend.onrender.com/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.value, password: password.value }),
  })

  const data = await res.json()
  if (res.ok) {
    emit("logged", data)
  } else {
    alert(data.message || "Error al iniciar sesión")
  }
}

function register() {
  window.location.href = "https://podhub-backend.onrender.com/register"
}
</script>
