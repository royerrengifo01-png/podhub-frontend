<template>
  <div class="registro-container">
    <!-- Lado Izquierdo (imagen completa) -->
    <div class="registro-imagen">
      <img src="@/assets/Registrarse.png" alt="Registro Podhub" />
    </div>

    <!-- Lado Derecho (formulario) -->
    <div class="registro-formulario">
      <div class="form-box">
        <p class="nuevo-texto">
          ¿<span class="color-acento">Nuevo por aquí?</span> Desbloquea la experiencia completa de nuestros podcasts.
          ¡Regístrate ahora en <span class="color-acento">Podhud!</span>
        </p>

        <h2 class="titulo">Registrarte</h2>


          <div class="campo">
            <label>Nombre Completo</label>
            <input v-model="name" type="name" placeholder="Ingrese su nombre" required />
          </div>


        
        <form @submit.prevent="registrarUsuario">
          <div class="campo">
            <label>Correo electrónico</label>
            <input v-model="correo" type="email" placeholder="Ingrese correo electrónico" required />
          </div>

          <div class="campo">
            <label>Contraseña</label>
            <input v-model="contrasena" type="password" placeholder="Ingrese contraseña" required />
          </div>

          <div class="campo">
            <label>Confirma tu contraseña</label>
            <input v-model="confirmarContrasena" type="password" placeholder="Ingrese contraseña" required />
          </div>

          <p v-if="error" class="error-texto">{{ error }}</p>
          <p v-if="exito" class="exito-texto">{{ exito }}</p>

          <button type="submit" class="boton-registrar">Registrate</button>
        </form>

        <p class="texto-login">
          ¿Ya tienes cuenta?
          <router-link to="/login" class="link">Inicia aquí</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Registro",
  data() {
    return {
      name: "",
      correo: "",
      contrasena: "",
      confirmarContrasena: "",
      error: "",
      exito: "",
    };
  },
  methods: {
    async registrarUsuario() {
      this.error = "";
      this.exito = "";

      // Validar campos vacíos
      if (!this.name || !this.correo || !this.contrasena || !this.confirmarContrasena) {
        this.error = "Por favor completa todos los campos.";
        return;
      }

      // Validar contraseñas
      if (this.contrasena !== this.confirmarContrasena) {
        this.error = "Las contraseñas no coinciden.";
        return;
      }

try {
  const respuesta = await axios.post("https://podhub-backend.onrender.com/api/register", {
    name: this.name,
    email: this.correo,
    password: this.contrasena,
  });

  console.log("📩 Respuesta del backend:", respuesta); // 👈 Esto mostrará todo lo que devuelve tu API

  if (respuesta.status === 201 || respuesta.status === 200) {
    this.exito = "Usuario creado correctamente. Redirigiendo al login...";
    this.name = "";
    this.correo = "";
    this.contrasena = "";
    this.confirmarContrasena = "";

    setTimeout(() => {
      this.$router.push("/login");
    }, 2000);
  } else {
    this.error = `Error inesperado. Código: ${respuesta.status}`;
  }
} catch (error) {
  console.error("❌ Error en el registro:", error.response || error);
  this.error =
    error.response?.data?.error ||
    error.response?.data?.message ||
    "Ocurrió un error al registrar el usuario.";
}

    },
  },
};
</script>

<style scoped>
.registro-container {
  display: flex;
  min-height: 100vh;
  background-color: #0d0d0f;
  color: #fff;
  font-family: "Poppins", sans-serif;
}

/* Lado izquierdo */
.registro-imagen {
  margin-left: 30px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.registro-imagen img {
  width: 100%;
  height: 75vh;
  object-fit: cover;
}

/* Lado derecho */
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

.campo label {
  font-size: 14px;
  margin-bottom: 5px;
}

.campo input {
  background-color: transparent;
  border: 1px solid #3a3a3a;
  padding: 10px;
  border-radius: 8px;
  color: #fff;
  outline: none;
  transition: border 0.3s;
}

.campo input:focus {
  border: 1px solid #e65cff;
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
  margin-top: 10px;
  transition: opacity 0.3s;
}

.boton-registrar:hover {
  opacity: 0.85;
}

.texto-login {
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
}

.link {
  color: #e65cff;
  font-weight: 500;
}

.error-texto {
  color: #ff5c5c;
  font-size: 14px;
  margin-top: -5px;
  margin-bottom: 10px;
}

.exito-texto {
  color: #4ef584;
  font-size: 14px;
  margin-top: -5px;
  margin-bottom: 10px;
}
</style>
