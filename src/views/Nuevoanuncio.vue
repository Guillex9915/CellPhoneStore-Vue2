<!--Vista para crear un anuncio-->
<template>
  <v-container>
    <NavbarGrande></NavbarGrande>
    <v-row>
      <v-col>
        <Nuevoproducto></Nuevoproducto>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Nuevoproducto from "./../components/Nuevoproducto.vue";
import NavbarGrande from "./../components/navbars/NavbarGrande.vue";
export default {
  name: "Nuevoanuncio",
  components: {
    NavbarGrande,
    Nuevoproducto,
  },
};
</script>
