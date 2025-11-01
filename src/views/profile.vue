<template>
  <div class="perfil-container">
    <!-- Contenedor principal -->
    <div class="perfil-contenido">
      <!-- Imagen lateral izquierda -->

      <!-- Sección derecha: formulario -->
      <div class="formulario">
        <h1 class="titulo">Perfil</h1>
        <p class="descripcion">
          Tu perfil está casi listo. Completa los campos restantes para asegurar tu cuenta y acceder a todas las funciones.
          ¡Tu seguridad es lo primero!
        </p>
      <div class="imagen-lateral">
        <img src="@/assets/barra.png" alt="Podcasts destacados" />
      </div>
        <!-- Foto de perfil -->
        <div class="foto-perfil">
          
          <label for="fotoInput">
            
            <img v-if="fotoPreview" :src="fotoPreview" alt="Foto de perfil" />
            
            <div v-else class="foto-placeholder">+</div>
            
          </label>
          <input id="fotoInput" type="file" @change="subirFoto" accept="image/*" />
        </div>

        <!-- Formulario -->
        <form @submit.prevent="guardarPerfil">
          <div class="campo">
            <label>Nombre</label>
            <input type="text" v-model="nombre" placeholder="Tu nombre" />
          </div>

          <div class="campo">
            <label>Email</label>
            <input type="email" v-model="email" placeholder="Correo electrónico" />
          </div>

          <div class="campo">
            <label>Dirección</label>
            <input type="text" v-model="direccion" placeholder="Tu dirección" />
          </div>

          <div class="campo">
            <label>Número</label>
            <input type="text" v-model="telefono" placeholder="Tu número de teléfono" />
          </div>

          <div class="fila">
            <div class="campo mitad">
              <label>Ciudad</label>
              <input type="text" v-model="ciudad" placeholder="Ciudad" />
            </div>

            <div class="campo mitad">
              <label>Estado</label>
              <input type="text" v-model="estado" placeholder="Estado o departamento" />
            </div>
          </div>

          <div class="campo">
            <label>Contraseña</label>
            <input type="password" v-model="contrasena" placeholder="Nueva contraseña" />
          </div>

          <div class="botones">
            <button type="button" class="cancelar" @click="cancelarCambios">Cancelar</button>
            <button type="submit" class="guardar">Guardar</button>
          </div>

          <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
        </form>
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
      direccion: "",
      telefono: "",
      ciudad: "",
      estado: "",
      contrasena: "",
      foto: null,
      fotoPreview: null,
      mensaje: "",
    };
  },
  methods: {
    subirFoto(event) {
      const archivo = event.target.files[0];
      if (archivo) {
        this.foto = archivo;
        const lector = new FileReader();
        lector.onload = (e) => {
          this.fotoPreview = e.target.result;
        };
        lector.readAsDataURL(archivo);
      }
    },

    async guardarPerfil() {
      try {
        const formData = new FormData();
        formData.append("email", this.email);
        formData.append("name", this.nombre);
        formData.append("adress", this.direccion);
        formData.append("phone", this.telefono);
        formData.append("city", this.ciudad);
        formData.append("state", this.estado);
        if (this.foto) formData.append("profile_photo", this.foto);

        const response = await fetch("https://podhub-backend.onrender.com/api/profile/update", {
          method: "PUT",
          body: formData,
        });

        if (response.ok) {
          this.mensaje = "✅ Perfil guardado correctamente";
        } else {
          const errorData = await response.json();
          console.error("⚠️ Error del servidor:", errorData);
          this.mensaje = "⚠️ Error al guardar el perfil";
        }
      } catch (error) {
        console.error("❌ Error al guardar perfil:", error);
        this.mensaje = "❌ Ocurrió un error al conectar con el servidor";
      }
    },

    cancelarCambios() {
      this.nombre = "";
      this.email = "";
      this.direccion = "";
      this.telefono = "";
      this.ciudad = "";
      this.estado = "";
      this.contrasena = "";
      this.fotoPreview = null;
      this.mensaje = "❌ Cambios cancelados";
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

.guardar {
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
