import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

// Define what components are mapped to each route on the website. Some are static imports, some are dynamically imported
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/graph",
    name: "Graph",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Graph.vue")
  },
  {
    path: "/heatmap",
    name: "Heatmap",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Heatmap.vue")
  },
  {
    path: "/pinmap",
    name: "Pinmap",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Pinmap.vue")
  }
];

// History for the router means that the website will operate like a SPA
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
