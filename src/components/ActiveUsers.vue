<template>
  <div class="active-users">
    <img
      src="https://i.imgur.com/ObX9tVn.png"
      alt="Users"
      class="users-img"
    />
    <span>Creado por Bueno y Valeria</span>
  </div>
</template>

<style scoped>
.active-users {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 1.5rem;
}

.users-img {
  width: 60px;
  height: 25px;
  object-fit: cover;
  border-radius: 20px;
}

span {
  color: #bbb;
  font-size: 0.9rem;
}
</style>
