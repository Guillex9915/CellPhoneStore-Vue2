import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { firestorePlugin } from "vuefire";

Vue.use(firestorePlugin);

Vue.config.productionTip = false;
export const bus =new Vue()

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
