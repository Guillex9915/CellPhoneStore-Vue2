<template>
  <v-app-bar app color="yellow darken-2" flat>
    <v-container class="py-0 fill-height">
      <v-icon class="d-none d-lg-flex d-xl-flex d-md-flex" color="white">
        mdi-cellphone
      </v-icon>
      <v-btn
        fab
        dark
        class="d-md-none d-lg-none d-xl-none"
        color="white"
        icon
        elevation="1"
        @click.stop="drawer = !drawer"
      >
        <v-icon color="white"> mdi-menu </v-icon>
      </v-btn>
      &nbsp; &nbsp;
      <v-btn
        class="d-none d-lg-flex d-xl-flex d-md-flex"
        color="white"
        plain
        :to="{ path: '/' }"
      >
        CellPhone Store
      </v-btn>

      <v-responsive
        class="d-none d-xs-none d-sm-flex d-md-flex d-lg-flex d-xl-flex"
        max-width="400"
      >
        <v-text-field
          dense
          flat
          hide-details
          rounded
          solo-inverted
          clearable
        ></v-text-field>
      </v-responsive>

      <v-responsive
        class="d-xs-flex d-sm-none d-md-none d-lg-none d-xl-none"
        max-width="225"
      >
        <v-text-field
          dense
          flat
          hide-details
          rounded
          solo-inverted
          clearable
        ></v-text-field>
      </v-responsive>
      <!--Botones de Inicio-->
      &nbsp; &nbsp;
      <v-btn
        class="amber darken-2 d-none d-sm-flex d-lg-flex d-xl-flex d-md-flex"
        color="white"
        text
        elevation="2"
        :to="{ path: '/' }"
      >
        Inicio
      </v-btn>
      &nbsp; &nbsp;
      <v-btn
        class="amber darken-2 d-none d-lg-flex d-xl-flex d-md-flex"
        color="white"
        text
        elevation="2"
      >
        Estadisticas
      </v-btn>
      &nbsp; &nbsp; &nbsp; &nbsp;
      <v-btn
        class="d-none d-sm-flex d-lg-flex d-xl-flex d-md-flex"
        color="white"
        icon
        elevation="3"
        :to="{ path: '/Nuevoanuncio' }"
      >
        <!-- Poner adentro del btn-->

        <v-icon color="white"> mdi-plus </v-icon>
      </v-btn>
      &nbsp; &nbsp;
      <router-link
        :to="{ name: 'Cart', params: { carrito: carrito } }"
        style="text-decoration: none"
      >
        <v-btn
          class="d-none d-sm-none d-lg-flex d-xl-flex d-md-flex"
          color="white"
          icon
          elevation="3"
        >
          <v-icon color="white"> mdi-cart-variant </v-icon>
        </v-btn>
      </router-link>

      <!--Navigation Drawer-->
      <v-navigation-drawer
        v-model="drawer"
        app
        absolute
        temporary
        max-height="100"
        color="blue-grey lighten-5"
        p
      >
        <v-list nav dense>
          <v-list-item-group v-model="group" active-class="">
            <v-list-item>
              <v-btn class="" color="amber darken-2" plain :to="{ path: '/' }">
                CellPhone Store
              </v-btn>
              <v-icon class="" color="amber darken-2"> mdi-cellphone </v-icon>
            </v-list-item>
            <br />
            <v-list-item>
              <v-icon color="black"> mdi-home </v-icon>
              <v-btn
                class="text-center"
                color="black"
                plain
                :to="{ path: '/' }"
              >
                Inicio
              </v-btn>
            </v-list-item>
            <v-divider></v-divider>

            <v-list-item>
              <v-icon color="black"> mdi-plus </v-icon>
              <v-btn
                class="text-center"
                color="black"
                plain
                :to="{ path: '/Nuevoanuncio' }"
              >
                Nuevo anuncio
              </v-btn>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-icon color="black"> mdi-cart </v-icon>
              <router-link
                :to="{ name: 'Cart', params: { carrito: carrito } }"
                style="text-decoration: none"
              >
                <v-btn class="text-center" color="black" plain> Carrito </v-btn>
              </router-link>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-icon color="black"> mdi-chart-bar </v-icon>
              <v-btn
                class="text-center"
                color="black"
                plain
                :to="{ path: '/' }"
              >
                Estadisticas
              </v-btn>
            </v-list-item>
            <v-divider></v-divider>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-container>
  </v-app-bar>
</template>

<script>
import Nuevoproducto from "./../Nuevoproducto.vue";
export default {
  components: Nuevoproducto,
  name: "NavbarGrande",
  props: ["carrito"],
  data: () => ({
    drawer: false,
    group: null,
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
