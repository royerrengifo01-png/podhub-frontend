<template>
  <div class="registro-container">
    <RegisterImage />
    <RegisterForm />
  </div>
</template>

<script setup>
import RegisterImage from "@/components/RegisterImage.vue";
import RegisterForm from "@/components/RegisterForm.vue";
</script>

<style scoped>
.registro-container {
  display: flex;
  min-height: 100vh;
  background-color: #0d0d0f;
  color: #fff;
  font-family: "Poppins", sans-serif;
}
</style>
