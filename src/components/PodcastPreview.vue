<template>
  <MainLayout>
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
          <FormImagen v-model:file="imageFile" />

          <h2 class="title">Añadir audio del podcast</h2>
          <FormAudio v-model:file="audioFile" />

          <PodcastPlayer v-if="audioURL" :src="audioURL" />

          <div class="buttons">
            <button type="button" class="cancel-btn">Cancelar</button>
            <button @click="enviarPodcast" class="submit-btn">Subir</button>
          </div>
        </div>

        <!-- Columna derecha -->
        <div class="image-section">
          <img src="@/assets/Subir.png" class="decor-image" />
        </div>

      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import MainLayout from "@/layouts/MainLayout.vue";
import FormImagen from "@/components/FormImagen.vue";
import FormAudio from "@/components/FormAudio.vue";
import PodcastPlayer from "@/components/PodcastPlayer.vue";

const title = ref("");
const author = ref("");
const topic = ref("");
const imageFile = ref(null);
const audioFile = ref(null);

const audioURL = ref("");

function getAudioURL(file) {
  if (file) audioURL.value = URL.createObjectURL(file);
}

watch(audioFile, () => getAudioURL(audioFile.value));

async function enviarPodcast() {
  try {
    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("author", author.value);
    formData.append("topic", topic.value);
    if (imageFile.value) formData.append("image", imageFile.value);
    if (audioFile.value) formData.append("audio", audioFile.value);

    await axios.post(
      "https://podhub-backend.onrender.com/api/podcasts",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    alert("Podcast subido con éxito");
  } catch (error) {
    console.log(error);
    alert("Error al subir el podcast");
  }
}
</script>
