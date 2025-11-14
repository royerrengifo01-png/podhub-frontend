<template>
  <div class="foto-perfil">
    <label for="fotoInput">
      <img 
        v-if="fotoPreview" 
        :src="fotoPreview" 
        alt="Foto" 
      />
      <div v-else class="foto-placeholder">+</div>
    </label>

    <input 
      id="fotoInput" 
      type="file" 
      accept="image/*"
      @change="$emit('subirFoto', $event)"
    />
  </div>
</template>

<script>
export default {
  name: "FotoPerfil",
  props: ["fotoPreview"],
};
</script>

<style scoped>
/* estilos que ya tienes */
</style>
