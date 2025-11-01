<template>
  <section class="podcast-section">
    <!-- LADO IZQUIERDO -->
    <div class="text-content">
      <h1>
        Listo para escuchar<br />
        los mejores audio<br />
        <span class="highlight">podcast</span>
      </h1>

      <p class="description">
        Descubre, escucha y comparte los mejores podcasts en una sola plataforma.
      </p>

<button>Buscar Podcast</button>


      <div class="active-users">
        <img
          src="https://i.imgur.com/ObX9tVn.png"
          alt="Users"
          class="users-img"
        />
        <span>Creado por Bueno y valeria</span>
      </div>
    </div>

    <!-- LADO DERECHO (una sola imagen PNG) -->
    <div class="image-side">
      <img :src="podcastImage" alt="Podcast Hero" class="alex-image" />
    </div>
  </section>
</template>

<script setup>
import podcastImage from "@/assets/royer.png";
</script>
<style scoped>

/* CONTENEDOR PRINCIPAL */
.podcast-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0f 50%, #000000 100%);
  height: 100vh;
  padding: 0 6%;
  font-family: "Poppins", sans-serif;
}

/* LADO IZQUIERDO */
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
  font-size: 1.rem;
  margin-bottom: 2rem;
  max-width: 420px;
  line-height: 1.6;
}

.browse-button {
  background: linear-gradient(90deg, #ff7b54, #8b5cf6);
  border: none;
  padding: 12px 28px;
  color: white;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.browse-button:hover {
  transform: scale(1.05);
}

/* Usuarios activos */
.active-users {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 1.5rem;
}

.users-img {
  width: 60px;
  height: 25px;
  object-fit: cover;
  border-radius: 20px;
}

.active-users span {
  color: #bbb;
  font-size: 0.9rem;
}

/* LADO DERECHO (IMAGEN HERO) */
.image-side {
  position: relative;
  margin-top: 50px;
  width: 520px;
  margin-top: -120px;
  transition: cubic-bezier(0.165, 0.84, 0.44, 1);
  transform: scale(1.05);
}

.alex-image {
    margin-top: 60px;
  width: 100%;
  height: auto;
  display: block;
  transform: scale(1.05);
}
</style>
