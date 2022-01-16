import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/people",
    name: "nav.people",
    component: () =>
      import(/* webpackChunkName: "People" */ "../views/People.vue"),
  },
  {
    path: "/person/:id",
    name: "nav.person",
    component: () =>
      import(/* webpackChunkName: "Person" */ "../views/Person.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.name || !to.path) {
    router.push({ name: "nav.people" });
  }
  next();
});
export default router;
