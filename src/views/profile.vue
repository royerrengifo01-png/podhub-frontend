<template>
  <v-container  :class="{
        'container pa-4 my-12': $vuetify.breakpoint.smAndDown,
        'container pa-10 my-12': $vuetify.breakpoint.mdAndUp,
      }">
    <!-- alert -->
    <v-row>
      <v-alert text type="success" border="left" width="100%" dismissible>
        Gracias!, <strong>{{ name }}</strong> Tu perfil fue actualizado
        exitosamente !
      </v-alert>
    </v-row>
    <!-- avatar -->
    <v-row class="justify-center">
      <v-avatar size="150px">
        <img src="https://image.flaticon.com/icons/png/512/265/265674.png" />
      </v-avatar>
    </v-row>
    <!-- name -->
    <v-row class="justify-center pb-5">
      <span class="title text-secondary py-2 font-weight-bold">{{ name }}</span>
    </v-row>
    <v-text-field
      label="Primer Nombre"
      outlined
      shaped
      prepend-inner-icon="mdi-account"
      :value="formData.firstName"
    ></v-text-field>
    <v-text-field
      label="Segundo Nombre"
      outlined
      shaped
      prepend-inner-icon="mdi-account"
      :value="formData.lastName"
    ></v-text-field>
    <v-text-field
      label="Username"
      outlined
      shaped
      prepend-inner-icon="mdi-account"
      :value="formData.username"
    ></v-text-field>
    <v-text-field
      label="Email"
      outlined
      shaped
      prepend-inner-icon="mdi-email"
      :value="formData.email"
    ></v-text-field>
    <v-text-field
      label="Address"
      outlined
      shaped
      prepend-inner-icon="mdi-map-marker"
      :value="formData.address"
    ></v-text-field>
    <v-text-field
      label="Celular"
      outlined
      shaped
      prepend-inner-icon="mdi-phone"
      :value="formData.phoneNumber"
    ></v-text-field>
    <v-row>
      <v-col cols="12" md="6">
        <v-btn
          color="secondary"
          text
          block
          tile
          elevation="0"
          @click="backToPreviousPage()"
          class="pa-6 font-weight-bold"
        >
          Cancelar
        </v-btn>
      </v-col>
      <v-col cols="12" md="6">
        <v-btn
          color="info"
          class="pa-6 font-weight-bold"
          block
          tile
          elevation="0"
          @click="updateInfo()"
        >
          Actualizar Información
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    formData: {
      get: function () {
        return this.$store.getters["authPageModule/getFormData"];
      },
    },
    name() {
      if (!this.formData.firstName || !this.formData.lastName) return "Perfil";
      else return this.formData.firstName + " " + this.formData.lastName;
    },
  },
  methods: {
    backToPreviousPage() {
      this.$router.back();
    },
    updateInfo() {
      //fake post request
      this.axios
        .get("https://jsonplaceholder.typicode.com/todos/1")
        .then((response) => {
          this.$swal({
            title: "Actualización Exitosa !",
            text: "Tu perfil fue actualizado exitosamente",
            icon: "Exito",
            confirmButtonText: "Listo",
          });
        })
        .catch((error) => {
          this.$swal({
            title: "Oops, Something went wrong ! ",
            text: error.message,
            icon: "warning",
          });
        });
    },
  },
};
</script>

