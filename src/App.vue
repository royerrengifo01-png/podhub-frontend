<template>
  <div>
    <NavBar />  <!-- Siempre visible -->
    <router-view />
  </div>
</template>

<script setup>
import NavBar from './components/Navbar.vue'
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  background-color: #f5f5f5;
}
</style>
