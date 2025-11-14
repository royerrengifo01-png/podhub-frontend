<template>
  <div class="podcast-grid">
<PodcastCard
  v-for="pod in podcasts"
  :key="pod.id"
  :id="pod.id"
  :image="pod.image_url"
  :title="pod.title"
  :author="pod.author"
  :topic="pod.topic"
  :audio="pod.audio_url"
/>

  </div>
</template>

<script>
import PodcastCard from "./PodcastCard.vue";
import defaultImage from "@/assets/hero.jpg";

export default {
  name: "PodcastGrid",
  components: { PodcastCard },
  props: {
    podcasts: Array,
  },
  data() {
    return { defaultImage };
  },
};
</script>

<style scoped>
.podcast-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 25px;
}
</style>
