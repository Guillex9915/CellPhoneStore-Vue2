<!--Componente para nuevo producto-->
<template>
  <div>
    <div
      class="text-center orange--text"
      style="
        text-transform: uppercase;
        padding-top: 1rem;
        padding-bottom: 1.5rem;
      "
    >
      <h2>Nuevo Producto</h2>
    </div>

    <v-row>
      <v-col cols="12" md="6" lg="6" xl="6">
        <div class="pa-2">
          <label>Estado:</label>
          <v-radio-group v-model="estado">
            <v-radio color="amber" :label="`Nuevo`" :value="'Nuevo'"></v-radio>
            <v-radio color="amber" :label="`Usado`" :value="'Usado'"></v-radio>
          </v-radio-group>
        </div>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="marca"
            :rules="marcaRules"
            label="Marca"
            required
          ></v-text-field>

          <v-text-field
            v-model="modelo"
            :rules="modeloRules"
            label="Modelo"
            required
          ></v-text-field>

          <v-text-field
            v-model="pantalla"
            :rules="pantallaRules"
            label="Pantalla en pulgadas"
            required
          ></v-text-field>

          <v-select
            v-model="sistema"
            :items="items"
            :rules="[(v) => !!v || 'Sistema es obligatorio']"
            label="Sistema"
            required
          ></v-select>

          <v-text-field
            v-model="rom"
            :rules="romRules"
            label="ROM"
            required
          ></v-text-field>

          <v-text-field
            v-model="ram"
            :rules="ramRules"
            label="RAM"
            required
          ></v-text-field>

          <v-text-field
            v-model="descripcion"
            :rules="descripcionRules"
            label="Descripción"
            required
          ></v-text-field>

          <v-text-field
            v-model="vendedor"
            :rules="vendedorRules"
            label="Vendedor"
            required
          ></v-text-field>

          <v-text-field
            v-model="telefono_vendedor"
            :rules="telefonoRules"
            label="Teléfono"
            required
          ></v-text-field>
          <v-text-field
            v-model="titulo"
            :rules="tituloRules"
            label="Titulo"
            required
          ></v-text-field>
          <v-text-field
            v-model="precio"
            :rules="precioRules"
            label="Precio $"
            required
          ></v-text-field>
        </v-form>
      </v-col>
      <v-col cols="12" md="6" lg="6" xl="6">
        <div>
          <v-row>
            <v-col cols="12" md="12" lg="12" xl="12" class="text-center">
              <span
                class="subtitle-1 amber--text"
                style="text-transform: uppercase; font-weight: bold"
                >Subir Imagenes</span
              >
            </v-col>
            <v-col cols="12" md="12" lg="12" xl="12">
              <v-file-input
                v-show="agregado == false"
                v-model="file"
                multiple
                label="Agregar..."
                accept="image/*"
              ></v-file-input>
              <div class="text-center" style="padding-bottom: 1rem">
                <v-btn
                  class="primary"
                  :disabled="file == null"
                  @click="upload()"
                  >Subir</v-btn
                >
              </div>

              <v-carousel>
                <v-carousel-item
                  v-for="(imagen, i) in imagenesUrl"
                  :key="i"
                  :src="imagen"
                  reverse-transition="fade-transition"
                  transition="fade-transition"
                ></v-carousel-item>
              </v-carousel>
            </v-col>
            <v-col cols="12" md="12" class="">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Nombre</th>
                      <th class="text-left">-</th>
                      <th class="text-left">Accion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, key) in imagenes" :key="key">
                      <td>{{ item }}</td>
                      <td></td>
                      <td>
                        <v-btn @click="eliminarImagen(key)" class="error"
                          >Borrar</v-btn
                        >
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <div class="text-center" style="padding-top: 1rem">
      <v-btn
        color="success"
        class="mr-4"
        @click="agregar()"
        :disabled="agregado == true"
      >
        Guardar
      </v-btn>

      <v-btn color="amber white--text" class="mr-4" @click="cancelar()">
        Resetear
      </v-btn>
    </div>
    <br>
    <v-footer padless>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>Guillermo Enrique Martinez Figueroa MF17006</strong>
      </v-col>
    </v-footer>
  </div>
</template>


<script>
import { db } from "../db.js";
import { st } from "../db.js";
export default {
  name: "Nuevoproducto",
  data() {
    return {
      estado: "Nuevo",
      nid: 0,
      titulo: null,
      descripcion: null,

      marca: null,
      modelo: null,
      pantalla: null,
      precio: null,
      ram: null,
      rom: null,
      sistema: null,
      telefono_vendedor: null,
      vendedor: null,
      fecha: new Date().toLocaleDateString(),
      borrado: false,
      file: null,
      downloadURL: "",
      fileName: "",
      imagenes: [],
      imagenesUrl: [],
      imagen: null,
      items: ["Android", "iOS"],
      productos: [],
      agregado: false,

      // rules
      /*  valid: true,

      marcaRules: [
        (v) => !!v || "Marca es obligatorio",
        (v) =>
          (v && v.length <= 10) || "Marca debe de tener maximo 10 caracteres",
      ], */

      /*  modeloRules: [
        (v) => !!v || "Modelo es obligatorio",
        (v) =>
          (v && v.length <= 20) || "Modelo debe de tener maximo 20 caracteres",
      ],

      pantallaRules: [(v) => !!v || "Pantalla es obligatorio"],

      romRules: [(v) => !!v || "ROM es obligatorio"],

      ramRules: [(v) => !!v || "RAM es obligatorio"],

      descripcionRules: [(v) => !!v || "Descripción es obligatorio"],

      vendedorRules: [(v) => !!v || "Vendedor es obligatorio"],

      telefonoRules: [(v) => !!v || "Telefono es obligatorio"],

      tituloRules: [(v) => !!v || "Titulo es obligatorio"],

      precioRules: [(v) => !!v || "Precio es obligatorio"], */
    };
  },
  methods: {
    agregar() {
      let nuevo = {
        estado: this.estado,
        nid: this.nid,
        titulo: this.titulo,
        descripcion: this.descripcion,

        marca: this.marca,
        modelo: this.modelo,
        pantalla: this.pantalla,
        precio: parseFloat(this.precio),
        ram: this.ram,
        rom: this.rom,
        sistema: this.sistema,
        telefono_vendedor: this.telefono_vendedor,
        vendedor: this.vendedor,
        imagenes: this.imagenesUrl,
        fecha: this.fecha,
      };
      db.collection("celulares").add(nuevo);
      this.agregado = true;
      this.titulo = null;
      this.descripcion = null;
      this.estado = null;
      this.marca = null;
      this.modelo = null;
      this.pantalla = null;
      this.precio = null;
      this.ram = null;
      this.rom = null;
      this.sistema = null;
      this.telefono_vendedor = null;
      this.vendedor = null;
      this.imagenesUrl = [];
      (this.fecha = new Date()), (this.nid = null), this.listarImagenes();
      alert("Celular creado correctamente");
    },
    cancelar() {
      this.titulo = null;
      this.descripcion = null;
      this.estado = null;
      this.marca = null;
      this.modelo = null;
      this.pantalla = null;
      this.precio = null;
      this.ram = null;
      this.rom = null;
      this.sistema = null;
      this.telefono_vendedor = null;
      this.vendedor = null;
      this.imagenesUrl = [];
      this.imagenes = [];
      this.fecha = new Date();
      this.nid = null;
      this.borrado = false;
      this.limpiarCarpeta();
      console.log("");
    },
    validacionID() {
      if (this.productos.length === 0) {
        this.nid = 1;
      } else {
        this.nid = this.productos.length + 1;
      }
      console.log("el tamaño: " + this.productos.length);
    },
    limpiarCarpeta() {
      // let images = [];
      st.ref()
        .child("IDanuncio/" + this.nid + "/")
        .listAll()
        .then((res) => {
          let x = res.items.length;
          // carpeta nueva
          if (this.borrado === false && x === 0) {
            this.borrado = true;
            // carpeta existente con imagenes
          } else if (this.borrado === false && x > 0) {
            for (let i = 0; i < x; i++) {
              st.ref(
                "IDanuncio/" + this.nid + "/" + res.items[i].name
              ).delete();
            }
            this.borrado = true;
            // misma carpeta con imagenes
          }
        });
    },
    upload() {
      this.validacionID();
      let bandera = true;
      this.fileName = this.file[0].name;
      this.limpiarCarpeta();
      let carpeta = "IDanuncio/" + this.nid + "/" + this.fileName;
      var archivo = st.ref(carpeta);
      archivo
        .put(this.file[0])
        .then(() => {
          archivo.getDownloadURL().then((url) => {
            this.downloadURL = url;
            for (let nombre in this.imagenes) {
              if (this.imagenes[nombre] == this.fileName) {
                bandera = false;
                let ultimo = Object.keys(this.imagenesUrl).length;
                this.imagenesUrl.push(this.downloadURL);
                this.imagenesUrl[nombre] = this.imagenesUrl[ultimo];
                this.imagenesUrl.pop(this.downloadURL);
              }
            }
            this.file = null;
            this.fileName = "";

            if (bandera == true) {
              this.imagenesUrl.push(this.downloadURL);
              this.listarImagenes();
            } else {
              this.listarImagenes();
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    eliminarImagen(index) {
      this.imagenesUrl.splice(index, 1);
      st.ref("IDanuncio/" + this.nid + "/" + this.imagenes.splice(index, 1))
        .delete()
        .then(() => {
          this.downloadURL = "";
        })
        .catch((error) => {
          console.log(error);
        });
      this.file = null;
      this.fileName = "";
    },
    listarImagenes() {
      var this2 = this;
      this2.imagenes = [];
      st.ref()
        .child("IDanuncio/" + this2.nid + "/")
        .listAll()
        .then((res) => {
          res.items.forEach(function (itemRef) {
            /* console.log(itemRef.tamanio) */
            this2.imagenes.push(itemRef.name);
          });
        })
        .catch((error) => {
          console.log(error);
        });
      this.imagenesUrl.sort();
    },
  },

  firestore: {
    productos: db.collection("celulares"),
  },
};
</script>
