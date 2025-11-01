<template>
  <div
    class="bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-blue-500/20 transition transform cursor-pointer"
  >
    <img
      :src="podcast.image_url"
      alt="cover"
      class="w-full h-48 object-cover"
    />
    <div class="p-4">
      <h3 class="font-semibold text-lg mb-2 truncate">{{ podcast.title }}</h3>
      <button
        @click.stop="$emit('play', podcast)"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
      >
        ▶ Reproducir
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({ podcast: Object })
</script>
