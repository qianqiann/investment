import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about/:id',
    name: 'About',
    component: About,
  },
];

const router = new VueRouter({
  routes,

  // base: process.env.BASE_URL,
});

export default router;
