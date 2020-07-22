import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/excel',
    name: 'excel',
    component: () =>
      import(/* webpackChunkName: "excel" */ '../views/upload-excel')
  },
  {
    path: '/form',
    component: () =>
      import(/* webpackChunkName: "form" */ '../views/dynamic-form/demo')
  }
];

const router = new VueRouter({
  routes
});

export default router;
