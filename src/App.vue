<template>
  <v-app id="inspire">
    <!-- <NavbarGrande
    @goCarrito = "goCarrito()"
    ></NavbarGrande> -->
    <v-main>
      <router-view />
      
    </v-main>
    
  </v-app>
  
</template>


<script>
//import Filtrado from "./components/Filtrado.vue";
//import NavbarGrande from "./components/navbars/NavbarGrande.vue";
//import {bus} from "./main";
export default {
  name: "App",
  data: () => ({
    //
  }),
  components: {
   // NavbarGrande,
  },

};
</script>
