<template>
  <div
    class="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-800 flex items-center justify-between px-6 py-4 z-50 shadow-lg"
  >
    <div class="flex items-center gap-4">
      <img :src="image" alt="cover" class="w-16 h-16 rounded-lg object-cover" />
      <div>
        <h3 class="font-semibold text-lg">{{ title }}</h3>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <button
        @click="togglePlay"
        class="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white font-medium transition"
      >
        {{ isPlaying ? "⏸ Pausar" : "▶ Reproducir" }}
      </button>
      <button @click="$emit('close')" class="text-gray-400 hover:text-white">✖</button>
    </div>

    <audio ref="audioRef" :src="audioUrl" @ended="isPlaying = false"></audio>
  </div>
</template>

<script setup>
import { ref } from "vue"
const props = defineProps({
  title: String,
  audioUrl: String,
  image: String
})
const audioRef = ref(null)
const isPlaying = ref(false)
function togglePlay() {
  if (isPlaying.value) audioRef.value.pause()
  else audioRef.value.play()
  isPlaying.value = !isPlaying.value
}
</script>
