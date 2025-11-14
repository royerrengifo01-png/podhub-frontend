<template>
  <div class="form-and-image-container">

    <!-- FORMULARIO IZQUIERDA -->
    <div class="form-section">
      
      <!-- Título -->
      <h2 class="title">Título</h2>
      <input v-model="title" type="text" placeholder="Escribir el título" class="input-field" />

      <!-- Autor -->
      <h2 class="title">Autor</h2>
      <input v-model="author" type="text" placeholder="Nombre del autor" class="input-field" />

      <!-- Tema -->
      <h2 class="title">Tema</h2>
      <input v-model="topic" type="text" placeholder="Elegir un tema" class="input-field" />

      <!-- Imagen -->
      <h2 class="title">Añadir imagen</h2>
      <div class="image-upload">
        <label for="imageInput" class="upload-box">
          <img
            v-if="imagenPreview"
            :src="imagenPreview"
            class="image-preview"
          />

          <img
            v-else
            src="@/assets/Vector.png"
            class="image-placeholder"
          />
        </label>

        <input id="imageInput" type="file" accept="image/*" hidden @change="previewImage" />
      </div>

      <!-- AUDIO -->
      <h2 class="title">Añadir audio</h2>
      <div class="audio-upload">
        <input type="file" accept="audio/*" @change="previewAudio" class="audio-input" />

        <!-- Reproductor -->
        <div v-if="audioPreview" class="audio-player-box">
          <audio ref="audioTag" :src="audioPreview"></audio>

          <button @click="toggleAudio" class="audio-btn">
            {{ isPlaying ? 'Pausar' : 'Reproducir' }}
          </button>

          <button @click="cancelAudio" class="cancel-audio-btn">
            Cancelar Audio
          </button>
        </div>
      </div>

      <!-- BOTONES -->
      <div class="buttons">
        <button class="cancel-btn">Cancelar</button>
        <button @click="enviarPodcast" class="submit-btn">Subir</button>
      </div>
    </div>

    <!-- IMAGEN LADO DERECHO -->
    <div class="image-section">
      <img src="@/assets/Subir.png" class="decor-image" />
    </div>

  </div>
</template>



<script setup>
import { ref } from "vue"
import axios from "axios"

/* CAMPOS BASICOS */
const title = ref("")
const author = ref("")
const topic = ref("")

/* IMAGEN */
const imagenPreview = ref(null)
const imagenArchivo = ref(null)

/* AUDIO */
const audioPreview = ref(null)
const audioArchivo = ref(null)
const isPlaying = ref(false)
const audioTag = ref(null)

function previewImage(e) {
  const file = e.target.files[0]
  if (file) {
    imagenArchivo.value = file
    imagenPreview.value = URL.createObjectURL(file)
  }
}

function previewAudio(e) {
  const file = e.target.files[0]
  if (file) {
    audioArchivo.value = file
    audioPreview.value = URL.createObjectURL(file)
  }
}

function toggleAudio() {
  if (!audioTag.value) return

  if (isPlaying.value) {
    audioTag.value.pause()
  } else {
    audioTag.value.play()
  }

  isPlaying.value = !isPlaying.value
}

function cancelAudio() {
  if (audioTag.value) {
    audioTag.value.pause()
    audioTag.value.currentTime = 0
  }
  audioPreview.value = null
  audioArchivo.value = null
  isPlaying.value = false
}

async function enviarPodcast() {
  try {
    const formData = new FormData()

    formData.append("title", title.value)
    formData.append("author", author.value)
    formData.append("topic", topic.value)

    if (imagenArchivo.value) formData.append("image", imagenArchivo.value)
    if (audioArchivo.value) formData.append("audio", audioArchivo.value)

    await axios.post("https://podhub-backend.onrender.com/api/podcasts", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })

    alert("Podcast subido con éxito")

  } catch (error) {
    console.error(error)
    alert("Error al subir el podcast")
  }
}
</script>



<style scoped>
/* CONTENEDOR GENERAL */
.form-and-image-container {
  display: flex;
  gap: 80px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  color: white;
}

/* FORMULARIO */
.form-section {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 300px;
}

.title {
  font-weight: 600;
  font-size: 18px;
}

/* INPUT */
.input-field {
  background: #1e1f25;
  border: none;
  border-radius: 15px;
  padding: 12px 16px;
  color: white;
}

/* SUBIDA DE IMAGEN */
.upload-box {
  width: 150px;
  height: 150px;
  background: #181818;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.image-placeholder,
.image-preview {
  width: 140px;
  height: 140px;
  border-radius: 12px;
  object-fit: cover;
}

/* AUDIO */
.audio-player-box {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.audio-btn {
  background: #6a0dad;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 8px 14px;
  cursor: pointer;
}

.cancel-audio-btn {
  background: #444;
  color: white;
  border-radius: 12px;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
}

/* BOTONES */
.buttons {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.cancel-btn {
  background: #444;
  padding: 10px 20px;
  border-radius: 20px;
  color: white;
  border: none;
  cursor: pointer;
}

.submit-btn {
  background: linear-gradient(90deg, #a020f0, #ff0080);
  padding: 10px 20px;
  border-radius: 20px;
  color: white;
  border: none;
  cursor: pointer;
}

/* IMAGEN DERECHA */
.image-section {
  display: flex;
  align-items: center;
}

.decor-image {
  width: 330px;
  border-radius: 18px;
}
</style>
