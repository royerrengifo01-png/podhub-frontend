<template>
  <div class="play-view">

    <div class="player-container">

      <!-- Like arriba a la derecha -->
      <button class="like-btn" @click="toggleLike">
        <span v-if="liked">🤍</span>
        <span v-else>🤍</span>
      </button>

      <!-- Carrusel 3D -->
      <div class="carousel">
        <div
          v-for="(item, i) in podcastsList"
          :key="item.id"
          class="carousel-item"
          :class="{ active: i === index }"
          :style="computeStyle(i)"
          @click="goTo(i)"
        >
          <img :src="item.image_url" />
        </div>
      </div>

      <!-- Info -->
      <div class="info">
        <h1>{{ podcast.title }}</h1>
        <p>{{ podcast.author }}</p>
      </div>

      <!-- Controles -->
      <div class="nav-controls">
        <button class="btn-nav" @click="goPrev">⟨</button>
        <button class="btn-nav" @click="rewind10">⟲ 10s</button>
        <button class="btn-nav" @click="forward10">10s ⟳</button>
        <button class="btn-nav" @click="goNext">⟩</button>
      </div>

      <!-- Reproductor -->
      <audio
        ref="audioPlayer"
        v-if="podcast.audio_url"
        :src="podcast.audio_url"
        controls
        autoplay
        class="audio-player"
      ></audio>

      <p v-else>Cargando audio...</p>

    </div>
  </div>
</template>

<script>
export default {
  name: "PodcastPlayView",

  data() {
    return {
      podcast: {},
      podcastsList: [],
      index: 0,
      liked: false,
    };
  },

  async mounted() {
    const resAll = await fetch("https://podhub-backend.onrender.com/api/podcasts");
    this.podcastsList = await resAll.json();

    await this.syncWithRoute();
    await this.checkLike();
  },

  watch: {
    "$route.params.id"() {
      this.syncWithRoute();
      this.checkLike();
    },
  },

  methods: {
    async syncWithRoute() {
      const id = this.$route.params.id;
      const res = await fetch(`https://podhub-backend.onrender.com/api/podcasts/${id}`);
      this.podcast = await res.json();

      this.index = this.podcastsList.findIndex((p) => p.id == id);
    },

    /* ================================================
       ✔ VERIFICAR SI EL USUARIO YA DIO LIKE (BACKEND)
    ================================================= */
async checkLike() {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await fetch(
      "https://podhub-backend.onrender.com/api/likes",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      console.error("Error HTTP:", res.status);
      return;
    }

    const likes = await res.json();

    // Verifica si este podcast está en los likes del usuario
    this.liked = likes.some(like => like.podcastId === this.podcast.id);

  } catch (err) {
    console.error("Error verificando like:", err);
  }
}

,

    /* ================================================
       ✔ DAR / QUITAR LIKE (BACKEND)
    ================================================= */
async toggleLike() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Debes iniciar sesión para dar like");
    return;
  }

  const id = this.podcast.id;

  try {
    const res = await fetch(
      `https://podhub-backend.onrender.com/api/likes/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    // Cambiar estado según respuesta
    this.liked = data.liked;
  } catch (err) {
    console.error("Error al actualizar like:", err);
  }
},


    goTo(i) {
      const item = this.podcastsList[i];
      this.$router.push(`/podcast/${item.id}`);
    },

    goPrev() {
      if (this.index > 0) this.goTo(this.index - 1);
    },

    goNext() {
      if (this.index < this.podcastsList.length - 1) this.goTo(this.index + 1);
    },

    rewind10() {
      const a = this.$refs.audioPlayer;
      if (a) a.currentTime -= 10;
    },

    forward10() {
      const a = this.$refs.audioPlayer;
      if (a) a.currentTime += 10;
    },

    /* ---------------------------------------
      CARRUSEL 3D — COMPLETAMENTE IGUAL
    ---------------------------------------- */
    computeStyle(i) {
      const offset = i - this.index;

      if (Math.abs(offset) > 1) {
        return {
          opacity: 0,
          pointerEvents: "none",
          transform: "scale(0.5)",
        };
      }

      const translateX = offset * 240;

      return {
        transform: `translateX(calc(-50% + ${translateX}px)) scale(${offset === 0 ? 1 : 0.75})`,
        filter: offset === 0 ? "none" : "blur(3px) brightness(0.5)",
        zIndex: 10 - Math.abs(offset),
        opacity: 1,
      };
    },
  },
};
</script>

<style scoped>
/* Fondo */
.play-view {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0f 50%, #000000 100%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 40px;
}

/* Contenedor */
.player-container {
  text-align: center;
  color: white;
  width: 100%;
  max-width: 420px;
  position: relative;
}

/* Like */
.like-btn {
  position: absolute;
  top: 10px;
  right: 14px;
  background: none;
  border: none;
  font-size: 32px;
  cursor: pointer;
  transition: 0.3s;
  z-index: 9999;
}

.like-btn:hover {
  transform: scale(1.2);
}

/* Carrusel */
.carousel {
  position: relative;
  height: 320px;
  margin-bottom: 20px;
  overflow: visible;
}

.carousel-item {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  transition: 0.35s ease;
  transform-origin: center center;
}

.carousel-item img {
  width: 260px;
  height: 260px;
  border-radius: 18px;
  object-fit: cover;
}

/* Info */
.info {
  margin-top: -50px;
  color: aliceblue;
}

/* Botones */
.nav-controls {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 18px 0;
}

.btn-nav {
  background: rgba(255,255,255,0.08);
  border: none;
  padding: 10px 14px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  color: white;
  transition: 0.2s;
}

.btn-nav:hover {
  background: rgba(255,255,255,0.18);
  transform: scale(1.1);
}

/* Audio */
.audio-player {
  width: 90%;
  margin-top: 10px;
}
</style>
