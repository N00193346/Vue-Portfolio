import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/Home.vue";
import VueDo from "@/pages/projects/vue-do/App.vue";
import VueGifs from "@/pages/projects/vue-gifs/App.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/demo/vue-do",
      name: "vue-do",
      component: VueDo,
    },
    {
      path: "/demo/vue-gifs",
      name: "vue-gifs",
      component: VueGifs,
    },
  ],
});
