import Vue from "vue";
import Router from "vue-router";
import Recettes from "../components/Recettes";
import AddRecette from "../components/AddRecettes";
import Home from "../components/Home.vue";
///just we handle the routes here we have 3 main routes to 3 views(the home , the search page , and the ADD page)
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
