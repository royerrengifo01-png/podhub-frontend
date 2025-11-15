<template>
  <div class="perfil-container">
    <div class="perfil-contenido">

      <div class="formulario">
        <h1 class="titulo">Perfil</h1>
        <p class="descripcion">
          Observa tu información personal.
        </p>

        <div class="imagen-lateral">
          <img src="@/assets/barra.png" alt="Decoración" />
        </div>

        <!-- FOTO -->
        <div class="foto-perfil">
          <img
            v-if="fotoPreview"
            :src="fotoPreview"
            alt="Foto de perfil"
          />
          <div v-else class="foto-placeholder">+</div>
        </div>

        <!-- SOLO MOSTRAR DATOS -->
        <div class="campo">
          <label>Nombre</label>
          <input type="text" v-model="nombre" disabled />
        </div>

        <div class="campo">
          <label>Email</label>
          <input type="email" v-model="email" disabled />
        </div>

        <div class="campo">
          <label>Contraseña</label>
          <input type="password" v-model="contrasena" disabled />
        </div>

        <button class="cerrar-sesion" @click="logout">
          Cerrar Sesión
        </button>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PerfilUsuario",

  data() {
    return {
      nombre: "",
      email: "",
      contrasena: "********",   // NO se muestra la real, por seguridad
      fotoPreview: null,
    };
  },

  async mounted() {
    this.cargarPerfil();
  },

  methods: {
    async cargarPerfil() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return this.$router.push("/login");

        const res = await fetch("https://podhub-backend.onrender.com/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        this.nombre = data.name;
        this.email = data.email;
        this.fotoPreview = data.profile_photo || null;

      } catch (err) {
        console.error("Error cargando perfil", err);
      }
    },

    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.perfil-container {
  background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0f 50%, #000000 100%);
  color: #fff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
}

.perfil-contenido {
  display: flex;
  max-width: 1300px;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40px;
  gap: 60px;
}

/* Imagen lateral */
.imagen-lateral  {
  display: flex;
  justify-content: flex-end; 
  margin-top: 50px;
  
}

/* Formulario */
.formulario {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.titulo {
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 10px;
}

.descripcion {
  color: #aaa;
  margin-bottom: 25px;
  line-height: 1.5;
  max-width: 550px;
}

/* Foto de perfil */
.foto-perfil {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 25px;
  position: relative; 
  margin-top: -250px;
}

.foto-perfil input {
  display: none;
}

.foto-perfil img {
  width: 130px;
  height: 130px;
  object-fit: cover;
  border-radius: 20px;
  cursor: pointer;
}

.foto-placeholder {
  width: 130px;
  height: 130px;
  border-radius: 20px;
  border: 2px dashed #888;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #888;
  font-size: 32px;
  cursor: pointer;
}

/* Campos */
.campo {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.campo label {
  font-size: 14px;
  color: #bbb;
  margin-bottom: 5px;
}

.campo input {
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #333;
  background: #1b1b1b;
  color: #fff;
  outline: none;
}

.campo input:focus {
  border-color: #a44dff;
}

.fila {
  display: flex;
  gap: 15px;
}

.mitad {
  flex: 1;
}

/* Botones */
.botones {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.cancelar {
  background: linear-gradient(90deg, #555, #777);
  color: white;
  padding: 10px 25px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-size: 15px;
}

.cerrar-sesion {
  background: linear-gradient(90deg, #ff00cc, #7b2fff);
  color: white;
  padding: 10px 25px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-size: 15px;
}

.mensaje {
  text-align: center;
  color: #9a5bff;
  margin-top: 15px;
}
</style>
