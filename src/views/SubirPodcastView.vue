<template>
  <div class="upload-container">
    <div class="content">
      <PodcastForm />
    </div>
  </div>
</template>

<script setup>
import PodcastForm from "@/components/PodcastForm.vue"
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
  justify-content: center;
  width: 100%;
}
</style>
