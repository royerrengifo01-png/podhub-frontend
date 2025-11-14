<template>
  <div class="login-page">
    <div class="login-container">
      <LoginForm />
      <LoginImage />
    </div>
  </div>
</template>

<script setup>
import LoginForm from "@/components/LoginForm.vue";
import LoginImage from "@/components/LoginImage.vue";
</script>

<style scoped>
.login-page {
  background-color: #0d0f13;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Poppins", sans-serif;
}

.login-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  color: white;
}
</style>
