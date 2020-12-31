import Vue from "vue";
import Router from "vue-router";
import Recettes from "../components/Recettes";
import AddRecette from "../components/AddRecettes";
import Home from "../components/Home.vue";

Vue.use(Router);
const router = new Router({
  routes: [
    { path: "/", component: Home },
    {
      path: "/search",
      component: Recettes
    },
    {
      path: "/addRecette",
      name: "/addRecettes",
      component: AddRecette
    }
  ]
});
export default router;
