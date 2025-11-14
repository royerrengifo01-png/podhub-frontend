<template>
  <div class="player">
    <button @click="togglePlay">
      {{ isPlaying ? "⏸ Pausar" : "▶ Reproducir" }}
    </button>

    <audio ref="audio" :src="src"></audio>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  src: String
});

const audio = ref(null);
const isPlaying = ref(false);

function togglePlay() {
  if (!audio.value) return;

  if (isPlaying.value) {
    audio.value.pause();
    isPlaying.value = false;
  } else {
    audio.value.play();
    isPlaying.value = true;
  }
}
</script>

<style scoped>
.player {
  margin-top: 20px;
}
button {
  background: #a020f0;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  color: white;
  cursor: pointer;
}
</style>
