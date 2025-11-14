<template>
  <div>
    <input type="file" accept="audio/*" @change="onSelect" />
  </div>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"]);

function onSelect(e) {
  const file = e.target.files[0];
  emit("update:modelValue", file);
}
</script>
