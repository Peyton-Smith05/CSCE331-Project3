import { createRouter, createWebHistory } from 'vue-router';

import Cashier from './Cashier.vue';

import Carousel from './Carousel.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Carousel, // Redirect the root path to the cashier interface
  },
  {
    path: '/cashier',
    name: 'cashier',
    component: Cashier,
  },
  // Add more routes for other pages if needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;