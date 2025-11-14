<template>
  <section class="podcast-section">
    <!-- IZQUIERDA -->
    <div class="text-content">
      <h1>
        Listo para escuchar<br />
        los mejores audio<br />
        <span class="highlight">podcast</span>
      </h1>

      <p class="description">
        Descubre, escucha y comparte los mejores podcasts en una sola plataforma.
      </p>

      <AppButton text="Buscar Podcast" />

      <ActiveUsers />
    </div>

    <!-- DERECHA -->
    <div class="image-side">
      <img :src="podcastImage" alt="Podcast Hero" class="alex-image" />
    </div>
  </section>
</template>

<script setup>
import podcastImage from "@/assets/royer.png";
import AppButton from "./AppButton.vue";
import ActiveUsers from "./ActiveUsers.vue";
</script>

<style scoped>
/* === Estilos iguales a los tuyos === */
.podcast-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0f 50%, #000000 100%);
  height: 100vh;
  padding: 0 6%;
  font-family: "Poppins", sans-serif;
}

.text-content {
  max-width: 500px;
  color: white;
}

.text-content h1 {
  font-size: 2.8rem;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 1.2rem;
}

.highlight {
  color: white;
  font-weight: 800;
}

.highlight::after {
  content: "🎧";
  margin-left: 6px;
}

.description {
  color: #ffffff;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 420px;
  line-height: 1.6;
}

.image-side {
  width: 520px;
  margin-top: -110px;
}

.alex-image {
  width: 100%;
  display: block;
  transform: scale(1.05);
}
</style>
