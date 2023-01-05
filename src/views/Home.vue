<template>
  <v-container>
    <NavbarGrande v-bind:carrito="carrito"></NavbarGrande>
    <v-row>
      <v-col
        cols="12"
        lg="3"
        sm="12"
        class="d-none d-md-none d-lg-flex d-xl-flex"
      >
        <Filtrado></Filtrado>
      </v-col>
      <v-col cols="12" lg="9" md="12" sm="6" xs="6" class="">
        <Precio></Precio>

        <Celulares @addCart="addCart"> </Celulares>

        <v-snackbar color="success" v-model="snackbar" :timeout="timeout">
          {{ text }}

          <template v-slot:action="{ attrs }">
            <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
              <v-icon color="white">mdi-close</v-icon>
            </v-btn>
          </template>
        </v-snackbar>
      
      </v-col>
      <v-col>
        <!--<Paginacion></Paginacion>-->
      </v-col>
    </v-row>
    <v-row style="padding-top: 2rem">
      <v-col cols="12">
        <v-footer padless>
          <v-col class="text-center" cols="12">
            {{ new Date().getFullYear() }} —
            <strong>Guillermo Enrique Martinez Figueroa MF17006</strong>
          </v-col>
        </v-footer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Filtrado from "./../components/Filtrado.vue";
import Precio from "./../components/Inicio/Precio.vue";
import Celulares from "./../components/Inicio/Celulares.vue";
//import { bus } from "./../main";
import NavbarGrande from "./../components/navbars/NavbarGrande.vue";
//import Paginacion from "./../components/Inicio/Paginacion.vue";
export default {
  name: "Home",
  data() {
    return {
      carrito: [],
      mensaje: false,
      snackbar: false,
      text: "Agregado con exito",
      timeout: 2000,
    };
  },

  components: {
    Filtrado,
    Precio,
    Celulares,
    NavbarGrande,
  },

  methods: {
    addCart(anuncio) {
      this.mensaje = false;
      // console.log(anuncio);
      let item = {};
      let incluye = false;
      let contador = 0;
      item.producto = anuncio;
      item.cantidad = 1;
      item.subtotal = item.producto.precio * item.cantidad;

      if (this.carrito.length === 0) {
        this.carrito.push(item);
        this.snackbar = true;

        //console.log(this.carrito);
        // this.showToast("info");
      } else {
        while (contador < this.carrito.length && incluye === false) {
          if (this.carrito[contador].producto.id == item.producto.id) {
            incluye = true;
            this.carrito[contador].cantidad =
              this.carrito[contador].cantidad + 1;
            this.carrito[contador].subtotal =
              this.carrito[contador].producto.precio *
              this.carrito[contador].cantidad;
            //this.showToast("info");
            this.snackbar = true;
          }
          contador++;
        }

        if (incluye === false) {
          this.carrito.push(item);
          this.snackbar = true;
          // this.showToast("info");
        }
      }
      // console.log(this.carrito);
    },
    /* goCarrito() {
      /* bus.$on("goCarrito", () => {
        this.$router.push({ name: "Cart", params: { carrito: this.carrito } });
      }); 
    }, */
  },
  /*  created() {
    bus.$on("goCarrito", () => {
        this.$router.push({ name: "Cart", params: { carrito: this.carrito } });
      }); */
  //}
};
</script>
