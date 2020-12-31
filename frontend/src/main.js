import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import router from "./router/router";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
// snip
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
