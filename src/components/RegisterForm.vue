<template>
  <div class="registro-formulario">
    <div class="form-box">
      <p class="nuevo-texto">
        ¿<span class="color-acento">Nuevo por aquí?</span> Desbloquea la experiencia completa.
        ¡Regístrate ahora en <span class="color-acento">Podhud!</span>
      </p>

      <h2 class="titulo">Registrarte</h2>

      <div class="campo">
        <label>Nombre completo</label>
        <input v-model="name" type="text" placeholder="Ingrese su nombre" required />
      </div>

      <form @submit.prevent="registrarUsuario">
        <div class="campo">
          <label>Correo electrónico</label>
          <input v-model="correo" type="email" placeholder="Ingrese correo" required />
        </div>

        <div class="campo">
          <label>Contraseña</label>
          <input v-model="contrasena" type="password" placeholder="Ingrese contraseña" required />
        </div>

        <div class="campo">
          <label>Confirma tu contraseña</label>
          <input v-model="confirmarContrasena" type="password" placeholder="Repite la contraseña" required />
        </div>

        <p v-if="error" class="error-texto">{{ error }}</p>
        <p v-if="exito" class="exito-texto">{{ exito }}</p>

        <button type="submit" class="boton-registrar">Registrarte</button>
      </form>

      <p class="texto-login">
        ¿Ya tienes cuenta?
        <router-link to="/login" class="link">Inicia aquí</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const name = ref("");
const correo = ref("");
const contrasena = ref("");
const confirmarContrasena = ref("");
const error = ref("");
const exito = ref("");

const router = useRouter();

async function registrarUsuario() {
  error.value = "";
  exito.value = "";

  if (!name.value || !correo.value || !contrasena.value || !confirmarContrasena.value) {
    error.value = "Por favor completa todos los campos.";
    return;
  }

  if (contrasena.value !== confirmarContrasena.value) {
    error.value = "Las contraseñas no coinciden.";
    return;
  }

  try {
    const respuesta = axios.post("https://podhub-backend.onrender.com/api/auth/register", {
      name: name.value,
      email: correo.value,
      password: contrasena.value,
    });

    if (respuesta.status === 201 || respuesta.status === 200) {
      exito.value = "Usuario creado correctamente. Redirigiendo...";
      name.value = "";
      correo.value = "";
      contrasena.value = "";
      confirmarContrasena.value = "";

      setTimeout(() => router.push("/login"), 2000);
    } else {
      error.value = `Error inesperado (código ${respuesta.status})`;
    }
  } catch (err) {
    error.value =
      err.response?.data?.error ||
      err.response?.data?.message ||
      "Ocurrió un error al registrar el usuario.";
  }
}
</script>

<style scoped>
.registro-formulario {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-box {
  width: 80%;
  max-width: 400px;
}

.nuevo-texto {
  font-size: 14px;
  color: #ccc;
  margin-bottom: 10px;
}

.color-acento {
  color: #e65cff;
}

.titulo {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
}

.campo {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.campo input {
  background-color: transparent;
  border: 1px solid #3a3a3a;
  padding: 10px;
  border-radius: 8px;
  color: #fff;
}

.boton-registrar {
  background: linear-gradient(90deg, #e65cff, #9c59ff);
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 500;
  cursor: pointer;
}

.texto-login {
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
}

.error-texto {
  color: #ff5c5c;
  font-size: 14px;
}

.exito-texto {
  color: #4ef584;
  font-size: 14px;
}
</style>
