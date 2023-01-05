<template>
  <div>
    <!--class="d-none d-lg-flex d-xl-flex d-md-flex"-->
    <v-card elevation="3" class="d-none d-lg-flex d-xl-flex d-md-flex">
      <v-container
        style="padding-left: 1.4rem; margin-bottom: 1rem; padding-right: 5rem"
      >
        <h2 class="amber--text text-center" style="padding-top: 1rem">
          Filtrar por:
        </h2>
        <v-switch
          v-model="switch1"
          color="amber"
          style="font-weight: bold"
          inset
          label="Nuevo"
          selected
          value="Nuevo"
          @click="filtrarProductos()"
        ></v-switch>
        <br />
        <v-divider></v-divider>
        <h3 class="amber--text">Marca</h3>
        <div>
          <v-checkbox
            style="margin-bottom: -1.5rem"
            color="amber darken-4"
            v-model="marcas"
            value="iPhone"
            :label="`iPhone`"
            @click="filtrarProductos()"
          >
          </v-checkbox>
          <v-checkbox
            style="margin-bottom: -1.5rem"
            color="amber darken-4"
            v-model="marcas"
            value="Samsung"
            :label="`Samsung`"
            @click="filtrarProductos()"
          >
          </v-checkbox>
          <v-checkbox
            style="margin-bottom: -1.5rem"
            color="amber darken-4"
            v-model="marcas"
            value="Realme"
            :label="`Realme`"
            @click="filtrarProductos()"
          >
          </v-checkbox>
          <v-checkbox
            style="margin-bottom: -1.5rem"
            color="amber darken-4"
            v-model="marcas"
            value="Huawei"
            :label="`Huawei`"
            @click="filtrarProductos()"
          >
          </v-checkbox>
          <v-checkbox
            style="margin-bottom: -1.5rem"
            color="amber darken-4"
            v-model="marcas"
            value="Xiaomi"
            :label="`Xiaomi`"
            @click="filtrarProductos()"
          >
          </v-checkbox>
        </div>

        <br />
        <v-divider></v-divider>
        <h3 class="amber--text">Sistema</h3>
        <v-checkbox
          style="margin-bottom: -1.5rem"
          color="amber darken-4"
          v-model="sistemas"
          value="iOS"
          :label="`iOS`"
          @click="filtrarProductos()"
        >
        </v-checkbox>
        <v-checkbox
          style="margin-bottom: -1.5rem"
          color="amber darken-4"
          v-model="sistemas"
          value="Android"
          :label="`Android`"
          @click="filtrarProductos()"
        >
        </v-checkbox>
        <br />
        <v-divider></v-divider>
        <h3 class="amber--text">Pantalla</h3>
        <v-checkbox
          style="margin-bottom: -1.5rem"
          color="amber darken-4"
          v-model="pantallas"
          value="5"
          :label="`5''`"
          @click="filtrarProductos()"
        >
        </v-checkbox>
        <v-checkbox
          style="margin-bottom: -1.5rem"
          color="amber darken-4"
          v-model="pantallas"
          value="6"
          :label="`6''`"
          @click="filtrarProductos()"
        >
        </v-checkbox>
        <v-checkbox
          style="margin-bottom: -1.5rem"
          color="amber darken-4"
          v-model="pantallas"
          value="7"
          :label="`7''`"
          @click="filtrarProductos()"
        >
        </v-checkbox>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { db } from "./../db";
import { bus } from "./../main";
export default {
  name: "Filtrado",
  data() {
    return {
      marcas: [],
      sistemas: [],
      pantallas: [],
      switch1: [],
      productos: [],
      range: [0, 1000],
      checkmarca: [
        "iPhone",
        "Samsung",
        "Huawei",
        "OnePlus",
        "Xiaomi",
        "Realme",
      ],
      checksistemas: ["iOS", "Android"],
      tamanios: ['5"', '5,5"', '6"', '7"', '8"'],
    };
  },

  methods: {
    llenarArray() {
      db.collection("celulares")
        .get()
        .then((data) => {
          data.forEach((element) => {
            this.productos.push(element.data());
            console.log(element.data());
          });
        });
      console.log("el tamanio: " + this.productos.length);

      this.filtrarProductos();
    },

    filtrarProductos() {
      bus.$emit("FProductos", this.selectedItems());
      console.log(this.marcas);
      console.log(this.selectedItems().length);
    },

    selectedItems() {
      let cadena;
      if (this.switch1.length > 0) {
        cadena = "Nuevo";
        console.log(cadena);
      } else if (this.switch1 == 0) {
        cadena = "Usado";
        console.log(cadena);
      }
      if (this.productos.length == 0) {
        return this.productos;
      } else {
        return this.productos.filter(function (newProductos) {
          console.log("opcion 0");
          if (
            this.marcas.length > 0 ||
            this.pantallas.length > 0 ||
            this.sistemas.length > 0
          ) {
            if ((this.marcas.length > 0) & (this.pantallas.length > 0)) {
              console.log("opcion 1");
              return (
                this.marcas.includes(newProductos.marca) &
                this.pantallas.includes(newProductos.pantalla) &
                (cadena === newProductos.estado)
              );
            } else if ((this.marcas.length > 0) & (this.sistemas.length > 0)) {
              console.log("opcion 2");
              return (
                this.marcas.includes(newProductos.marca) &
                this.sistemas.includes(newProductos.sistema) &
                (cadena === newProductos.estado)
              );
            } else if (
              (this.sistemas.length > 0) &
              (this.pantallas.length > 0)
            ) {
              console.log("opcion 3");
              return (
                this.sistemas.includes(newProductos.sistema) &
                this.pantallas.includes(newProductos.pantalla) &
                (cadena === newProductos.estado)
              );
            } else {
              console.log("opcion 4");
              return (
                this.marcas.includes(newProductos.marca) ||
                this.sistemas.includes(newProductos.sistema) ||
                this.pantallas.includes(newProductos.pantalla) &
                  (cadena === newProductos.estado)
              );
            }
          } else {
            console.log("opcion 5");
            return (
              !this.marcas.includes(newProductos.marca) &
              !this.sistemas.includes(newProductos.sistema) &
              !this.pantallas.includes(newProductos.pantalla) &
              (cadena === newProductos.estado)
            );
          }
        }, this);
      }
    },
  },

  firestore: {
    productos: db.collection("celulares"),
  },

  mounted() {
    this.filtrarProductos();
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
