<template>
  <label class="image-upload">
    <img
      v-if="preview"
      :src="preview"
      class="image-preview"
    />
    <img
      v-else
      src="@/assets/Vector.png"
      class="image-placeholder"
    />
    <input type="file" hidden @change="onSelect" />
  </label>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const preview = ref(null);

function onSelect(e) {
  const file = e.target.files[0];
  emit("update:modelValue", file);

  if (file) preview.value = URL.createObjectURL(file);
}
</script>

<style scoped>
.image-placeholder,
.image-preview {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 10px;
}
</style>
