<template>
  <div class="podcast-card" @click="openPodcast">
    <img :src="image" alt="Podcast cover" class="podcast-image" />

    <div class="podcast-info">
      <p class="podcast-topic">{{ topic }}</p>
      <h3 class="podcast-title">{{ title }}</h3>
      <p class="podcast-author">{{ author }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PodcastCard",
  props: {
    id: Number,
    image: String,
    title: String,
    author: String,
    topic: String,
    audio: String,
  },
  methods: {
    openPodcast() {
      this.$router.push(`/podcast/${this.id}`);
    }
  }
};
</script>

<style scoped>
.podcast-card {
  background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0f 50%, #000000 100%);
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
