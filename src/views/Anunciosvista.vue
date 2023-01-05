<template>

  <v-container>
    <NavbarGrande></NavbarGrande>
    <v-row>
      <v-col cols="12" md="6" lg="6" xl="6">
        <v-carousel :show-arrows="false">
          <v-carousel-item
            v-for="(img, i) in anuncio.imagenes"
            :src="img"
            :key="i"
          ></v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col cols="12" md="6" lg="6" xl="6">
        <v-card elevation="3">
          <v-container>
            <h1 class="amr--text text-center">
              {{ anuncio.marca }} {{ anuncio.modelo }}
            </h1>
            <br />
            <h2 class="amber--text text-center">{{ anuncio.titulo }}</h2>
            <br />
            <h2 class="green--text text-center">${{ anuncio.precio }}</h2>
            <div class="text-center" style="padding-bottom: 1rem">
              <br />
              <v-btn rounded color="amber" dark>
                <!--Comprar-->
                Comprar
              </v-btn>
            </div>
          </v-container>
        </v-card>
        <br />
        <v-card>
          <v-container>
            <v-row>
              <v-col cols="6">
                <h5 class="amr--text text-center">
                  Vendedor: {{ anuncio.vendedor }}
                </h5>
              </v-col>
              <v-col cols="6">
                <h5 class="amr--text text-center">
                  Vendedor: {{ anuncio.telefono_vendedor }}
                </h5>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <!--Aqui va las cards de la descripcion-->
      </v-col>
    </v-row>
    <br />
    <h1 class="text-center" style="text-transform: uppercase">Descripción</h1>
    <v-row>
      <v-col cols="12" md="6" lg="6" xl="6">
        <v-card elevation="3" style="padding-left: 1rem" height="350px">
          <br />
          <h4 style="padding-bottom: 1rem">
            Estado: <span style="color: orange">{{ anuncio.estado }}</span>
          </h4>
          <h4 style="padding-bottom: 1rem">
            Marca: <span style="color: orange">{{ anuncio.marca }}</span>
          </h4>
          <h4 style="padding-bottom: 1rem">
            Modelo: <span style="color: orange">{{ anuncio.modelo }}</span>
          </h4>
          <h4 style="padding-bottom: 1rem">
            Pantalla:
            <span style="color: orange">{{ anuncio.pantalla }} pulgadas</span>
          </h4>
          <h4 style="padding-bottom: 1rem">
            Sistema: <span style="color: orange">{{ anuncio.sistema }}</span>
          </h4>
          <h4 style="padding-bottom: 1rem">
            ROM: <span style="color: orange">{{ anuncio.rom }}GB</span>
          </h4>
          <h4 style="padding-bottom: 1rem">
            RAM: <span style="color: orange">{{ anuncio.ram }}GB</span>
          </h4>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="6" xl="6">
        <v-card
          elevation="3"
          style="padding-left: 1rem; padding-right: 1rem; text-align: justify"
          height="350px"
        >
          <br />
          <h4>
            {{ anuncio.descripcion }}
          </h4>
        </v-card>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
import { db } from "./../db";
import NavbarGrande from "./../components/navbars/NavbarGrande.vue"
export default {
  components: {NavbarGrande},
  data() {
    return {
      anuncio: {},
    };
  },
  methods: {
    async mostrarProducto() {
      await db
        .collection("celulares")
        .doc(this.$route.params.id)
        .get()
        .then((r) => {
          this.anuncio = r.data();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  created() {
    this.mostrarProducto();
  },
};
</script>

<style lang="scss" scoped></style>
