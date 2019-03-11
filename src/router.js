import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/Dashboard.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/projects",
      name: "projects",
      component: () =>
        import(/* webpackChunkName: "Projects" */ "./views/Projects.vue")
    },
    {
      path: "/team",
      name: "team",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Team.vue")
    }
  ]
});
