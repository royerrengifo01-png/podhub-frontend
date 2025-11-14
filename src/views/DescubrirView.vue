<template>
  <div class="main-home">
    <h2 class="section-title">Programas nuevos</h2>

    <PodcastGrid :podcasts="podcasts" />
  </div>
</template>

<script>
import PodcastGrid from "@/components/PodcastGrid.vue";

export default {
  name: "DescubrirView",
  components: { PodcastGrid },
  data() {
    return {
      podcasts: [],
    };
  },
  mounted() {
    this.fetchPodcasts();
  },
  methods: {
    async fetchPodcasts() {
      try {
const res = await fetch("https://podhub-backend.onrender.com/api/podcasts");

        this.podcasts = await res.json();
      } catch (e) {
        console.error("Error al cargar podcasts:", e);
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
}
.section-title {
  font-size: 22px;
  margin-bottom: 20px;
  font-weight: bold;
}
</style>
