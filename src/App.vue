<template>
  <div id="app" class="card-overlay">
    <v-app>
      <div
        :class="{
          'sm-main-style': $vuetify.breakpoint.smAndDown,
          'md-main-style': $vuetify.breakpoint.mdAndUp,
        }"
      >
        <div>
          <v-row class="my-4">
            <v-col cols="12" md="4">
              <v-btn
                tile
                block
                outlined
                elevation="0"
                color="info"
                :class="{
                  'p-0  m-0': $vuetify.breakpoint.smAndDown,
                  'mx-1': $vuetify.breakpoint.mdAndUp,
                }"
                @click="$router.push('/')"
                >Home</v-btn
              ></v-col
            >
            <v-col cols="12" md="4">
              <v-btn
                tile
                block
                outlined
                elevation="0"
                color="info"
                :class="{
                  'p-0  m-0': $vuetify.breakpoint.smAndDown,
                  'mx-1': $vuetify.breakpoint.mdAndUp,
                }"
                @click="$router.push('/profile')"
                >Profile</v-btn
              ></v-col
            >
            <v-col cols="12" md="4"
              ><v-btn
                tile
                block
                outlined
                elevation="0"
                color="info"
                :class="{
                  'p-0  m-0': $vuetify.breakpoint.smAndDown,
                  'mx-1': $vuetify.breakpoint.mdAndUp,
                }"
                @click="$router.push('/stats')"
                >our stats</v-btn
              ></v-col
            >
          </v-row>
        </div>
        <router-view />
      </div>
    </v-app>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800;900&display=swap");

#app {
  font-family: Raleway, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: url("https://static.vecteezy.com/system/resources/thumbnails/041/299/911/small_2x/ai-generated-podcast-microphone-with-vibrant-color-background-banner-for-recording-studio-copy-space-photo.jpg")
    no-repeat center center fixed;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
}

.sm-main-style {
  margin: auto;
  width: 95%;
}


.footer-md a {
  text-decoration: none;
  color: white !important;
  font-size: 1.1rem;
  font-family: cursive;
  font-weight: 600;
}

.footer-sm {
  padding: 20px 0px;
}
.footer-sm a {
  text-decoration: none;
  color: white !important;
  font-size: 0.8rem;
  font-family: cursive;
  font-weight: 600;
}
</style>
