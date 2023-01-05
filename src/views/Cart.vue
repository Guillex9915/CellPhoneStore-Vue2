<template>
  <div>
    <NavbarGrande v-bind:carrito="this.carrito"></NavbarGrande>
    <br />
    <h1 class="text-center amber--text">Carrito</h1>
    <br />
    <v-container>
      <v-card
        elevation="6"
        style="padding-top: 1rem; margin-bottom: 2rem; padding-bottom: 1rem"
        v-for="(anuncio, id) in $route.params.carrito"
        :key="id"
      >
        <v-row>
          <v-col cols="5" xs="3" sm="3" md="3" lg="3" xl="3">
            <v-img
              :src="anuncio.producto.imagenes[0]"
              max-height="400px"
              max-width="75%"
            >
            </v-img>
          </v-col>
          <v-col cols="5" xs="3" sm="3" md="3" lg="3" xl="3">
            <h3>
              <span style="font-weight: 500; color: orange"
                >{{ anuncio.producto.marca }}
                {{ anuncio.producto.modelo }}</span
              >
            </h3>
            <h3 style="color: green">${{ anuncio.producto.precio }}</h3>
            <h4>
              Vendedor:
              <span style="font-weight: 300">{{
                anuncio.producto.vendedor
              }}</span>
            </h4>
            <h4>
              Estado:
              <span style="font-weight: 300">{{
                anuncio.producto.estado
              }}</span>
            </h4>
            <h4>
              ROM:
              <span style="font-weight: 300">{{ anuncio.producto.rom }}GB</span>
            </h4>
            <h4>
              RAM:
              <span style="font-weight: 300">{{ anuncio.producto.ram }}GB</span>
            </h4>
          </v-col>
          <v-col cols="12" sm="12" xs="12" md="2" lg="2" xl="2" class="text-center">
            <div class="mx-auto">
              <v-btn
                @click="menos(id)"
                v-if="anuncio.cantidad == 1"
                style="background-color: red"
              >
                <v-icon color="white">mdi-delete</v-icon>
              </v-btn>

              <v-btn @click="menos(id)" v-if="anuncio.cantidad > 1"
                ><v-icon>mdi-minus</v-icon>
              </v-btn>
              <div class="d-inline col-1">
                {{ anuncio.cantidad }}
              </div>
              <v-btn @click="mas(id)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
          </v-col>

          <v-col cols="12" xs="6" sm="6" md="12" lg="12" xl="12" class="text-center">
            <div class="" style="text-align: center">
              <h3>Subtotal: <span style="color:green;">${{ anuncio.subtotal }}</span> </h3>
            </div>
          </v-col>
        </v-row>
      </v-card>

      <v-card
        elevation="6"
        style="padding-top: 1rem; margin-bottom: 2rem; padding-bottom: 1rem"
      >
        <v-row>
          <v-col class="text-center" cols="12" sm="12" xs="12" md="12" lg="12" xl="12">
            <h3>Total a pagar: <span style="color:green;">${{ total }}</span> </h3>
          </v-col>

          <v-col cols="12" sm="12" xs="12" md="12" lg="12" xl="12" style="text-align: center">
            <div class="" style="margin-bottom:1rem;">
              <router-link
              style="text-decoration: none; margin-bottom:1rem;"
                :to="{
                  name: 'Home',
                  params: { carrito: $route.params.carrito },
                }"
              >
                <v-btn class="amber">
                  <span class="">CONTINUAR COMPRANDO &nbsp;</span>
                  <v-icon>mdi-cart</v-icon>
                </v-btn>
              </router-link>
              
            </div>
            
            <div class="">
              <v-btn class="success">
                FINALIZAR LA COMPRA &nbsp;
                <v-icon>mdi-credit-card</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { db } from "./../db";
import NavbarGrande from "./../components/navbars/NavbarGrande.vue";
export default {
  name: "Cart",
  components: {
    NavbarGrande,
  },
  data() {
    return {
      carrito: [],
    };
  },

  computed: {
    total() {
      let totalPago = 0.0;      
      for (let index = 0; index < this.$route.params.carrito.length; index++) {
        totalPago = totalPago + this.carrito[index].subtotal;
      }
      return totalPago;
    },
  },

  mounted() {
    if (this.$route.params.carrito != undefined) {
      this.carrito = this.$route.params.carrito;
    }    
  },

  methods: {
    menos(id) {
      if (this.$route.params.carrito[id].cantidad == 1) {
        this.$route.params.carrito.splice(id, 1);
        this.carrito = this.$route.params.carrito.slice()
      } else {
        this.$route.params.carrito[id].cantidad =
          this.$route.params.carrito[id].cantidad - 1;
        this.$route.params.carrito[id].subtotal =
          this.$route.params.carrito[id].cantidad *
          this.$route.params.carrito[id].producto.precio;
      }
    },

    mas(id) {
      this.$route.params.carrito[id].cantidad =
        this.$route.params.carrito[id].cantidad + 1;
      this.$route.params.carrito[id].subtotal =
        this.$route.params.carrito[id].cantidad *
        this.$route.params.carrito[id].producto.precio;
    },
  },

  firestore: {
    carrito: db.collection("celulares"),
  },

};
</script>

<style lang="scss" scoped></style>
