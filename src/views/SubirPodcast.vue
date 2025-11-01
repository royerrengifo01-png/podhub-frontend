<template>
  <div class="upload-container">
    <div class="content">
      <!-- Columna izquierda -->
      <div class="form-section">
        <h2 class="title">Título</h2>
        <input v-model="title" type="text" placeholder="Escribir el título" class="input-field" />

        <h2 class="title">Autor</h2>
        <input v-model="author" type="text" placeholder="Nombre del autor" class="input-field" />

        <h2 class="title">Tema</h2>
        <input v-model="topic" type="text" placeholder="Elegir un tema" class="input-field" />

        <h2 class="title">Añadir imagen</h2>
        <div class="image-upload">
          <label for="imageInput">
            <img
              v-if="imagenPreview"
              :src="imagenPreview"
              alt="preview"
              class="image-preview"
            />
            <img
              v-else
              src="@/assets/Vector.png"
              alt="placeholder"
              class="image-placeholder"
            />
          </label>
          <input id="imageInput" type="file" @change="previewImage" accept="image/*" hidden />
        </div>

        <div class="buttons">
          <button type="button" class="cancel-btn">Cancelar</button>
          <button @click="enviarPodcast" class="submit-btn">Subir</button>
        </div>
      </div>

      <!-- Columna derecha (imagen fija decorativa) -->
      <div class="image-section">
        <img src="@/assets/Subir.png" alt="Podcast decorativo" class="decor-image" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const title = ref('')
const author = ref('')
const topic = ref('')
const imagenPreview = ref(null)
const imagenArchivo = ref(null)

function previewImage(event) {
  const file = event.target.files[0]
  if (file) {
    imagenArchivo.value = file
    imagenPreview.value = URL.createObjectURL(file)
  }
}

async function enviarPodcast() {
  try {
    const formData = new FormData()
    formData.append('title', title.value)
    formData.append('author', author.value)
    formData.append('topic', topic.value)
    if (imagenArchivo.value) {
      formData.append('image', imagenArchivo.value) // 👈 el nombre "image" debe coincidir con upload.single("image")
    }

    await axios.post('https://podhub-backend.onrender.com/api/podcasts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    alert('✅ Podcast subido con éxito')
    title.value = ''
    author.value = ''
    topic.value = ''
    imagenPreview.value = null
    imagenArchivo.value = null
  } catch (error) {
    console.error('❌ Error al subir el podcast:', error)
    alert('❌ Error al subir el podcast')
  }
}
</script>


<style scoped>
.upload-container {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0f 50%, #000000 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
}

.content {
  display: flex;
  gap: 100px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1200px;
  width: 100%;
}

/* ---- Columna izquierda ---- */
.form-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: white;
}

.title {
  font-size: 20px;
  font-weight: 600;
}

.input-field {
  background-color: #1e1f25;
  border: none;
  border-radius: 15px;
  padding: 12px 16px;
  color: #fff;
  font-size: 15px;
  width: 260px;
}

.input-field::placeholder {
  color: #aaa;
}

.image-upload {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.image-placeholder,
.image-preview {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 10px;
}

.buttons {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

.cancel-btn {
  background: linear-gradient(90deg, #444, #777);
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 25px;
  cursor: pointer;
  transition: 0.3s;
}

.cancel-btn:hover {
  opacity: 0.8;
}

.submit-btn {
  background: linear-gradient(90deg, #a020f0, #ff0080);
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 25px;
  cursor: pointer;
  transition: 0.3s;
}

.submit-btn:hover {
  opacity: 0.9;
}

/* ---- Columna derecha ---- */
.image-section {
  display: flex;
  justify-content: center;
  align-items: center;
margin-top: -90px;
}

.decor-image {
  width: 350px;
  height: auto;
  border-radius: 20px;
}
</style>
