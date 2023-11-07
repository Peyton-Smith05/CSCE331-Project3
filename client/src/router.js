import { createRouter, createWebHistory } from 'vue-router';

import CashierInterface from './Cashier.vue';

const routes = [
  {
    path: '/',
    redirect: '/cashier', // Redirect the root path to the cashier interface
  },
  {
    path: '/cashier',
    name: 'cashier',
    component: CashierInterface,
  },
  // Add more routes for other pages if needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;