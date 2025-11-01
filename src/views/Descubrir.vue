<template>
  <div class="main-home">
    <h2 class="section-title">Programas nuevos</h2>

    <div class="podcast-grid">
      <div 
        v-for="podcast in podcasts" 
        :key="podcast.id" 
        class="podcast-card"
      >
        <img 
          :src="podcast.image_url || defaultImage" 
          alt="Podcast cover" 
          class="podcast-image"
        />
        <div class="podcast-info">
          <p class="podcast-topic">{{ podcast.topic }}</p>
          <h3 class="podcast-title">{{ podcast.title }}</h3>
          <p class="podcast-author">{{ podcast.author }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import defaultImage from "@/assets/hero.jpg";

export default {
  name: "Descubrir",
  data() {
    return {
      podcasts: [],
      defaultImage,
    };
  },
  mounted() {
    this.fetchPodcasts();
  },
  methods: {
    async fetchPodcasts() {
      try {
        const response = await fetch("https://podhub-backend.onrender.com/api/podcasts");
        const data = await response.json();
        this.podcasts = data;
      } catch (error) {
        console.error("Error al cargar podcasts:", error);
      }
    },
  },
};
</script>


<style scoped>
.main-home {
  background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0f 50%, #000000 100%);
  min-height: 100vh;
  padding: 30px;
  color: white;
  font-family: 'Arial', sans-serif;
}

.section-title {
  font-size: 22px;
  margin-bottom: 20px;
  font-weight: bold;
}

.podcast-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 25px;
}

.podcast-card {
  background-color: #1c1c1c;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.podcast-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
}

.podcast-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.podcast-info {
  padding: 10px;
}

.podcast-title {
  font-size: 16px;
  font-weight: bold;
  margin: 5px 0;
  color: #fff;
}

.podcast-author,
.podcast-topic {
  font-size: 13px;
  color: #bdbdbd;
  margin: 2px 0;
}
</style>
