<template>
  <button class="app-button">
    {{ text }}
  </button>
</template>

<script setup>
defineProps({
  text: String
});
</script>

<style scoped>
.app-button {
  background: linear-gradient(90deg, #ff7b54, #8b5cf6);
  border: none;
  padding: 12px 28px;
  color: white;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.app-button:hover {
  transform: scale(1.05);
}
</style>
