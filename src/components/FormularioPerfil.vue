<template>
  <form @submit.prevent="$emit('guardar')">

    <div class="campo">
      <label>Nombre</label>
      <input type="text" :value="nombre" @input="$emit('update:nombre', $event.target.value)" />
    </div>

    <div class="campo">
      <label>Email</label>
      <input type="email" :value="email" @input="$emit('update:email', $event.target.value)" />
    </div>

    <div class="campo">
      <label>Dirección</label>
      <input type="text" :value="direccion" @input="$emit('update:direccion', $event.target.value)" />
    </div>

    <div class="campo">
      <label>Número</label>
      <input type="text" :value="telefono" @input="$emit('update:telefono', $event.target.value)" />
    </div>

    <div class="fila">
      <div class="campo mitad">
        <label>Ciudad</label>
        <input type="text" :value="ciudad" @input="$emit('update:ciudad', $event.target.value)" />
      </div>

      <div class="campo mitad">
        <label>Estado</label>
        <input type="text" :value="estado" @input="$emit('update:estado', $event.target.value)" />
      </div>
    </div>

    <div class="campo">
      <label>Contraseña</label>
      <input type="password" :value="contrasena" @input="$emit('update:contrasena', $event.target.value)" />
    </div>

    <div class="botones">
      <button type="button" class="cancelar" @click="$emit('cancelar')">Cancelar</button>
      <button type="submit" class="guardar">Guardar</button>
    </div>

    <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>

  </form>
</template>

<script>
export default {
  name: "FormularioPerfil",
  props: [
    "nombre",
    "email",
    "direccion",
    "telefono",
    "ciudad",
    "estado",
    "contrasena",
    "mensaje"
  ],
};
</script>
