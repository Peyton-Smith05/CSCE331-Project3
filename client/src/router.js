import { createRouter, createWebHistory } from 'vue-router';

import Cashier from './Cashier.vue';

import Toppings from './Toppings.vue';

import MenuItems from './Menu-Items.vue';

import Carousel from './Carousel.vue';

import Login from './Login.vue';

import Menu from './Menu.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Carousel, // Redirect the root path to the cashier interface
  },
  {
    path: '/cashier',
    name: 'Cashier',
    component: Cashier,
    children: [
      {
        path: '', // Empty path for the child route
        redirect: '/menuitems' // Redirects '/parent' to '/parent/defaultChildRoute'
      },
      {
        path: '/menuitems', // Nested route for MenuItems
        name: 'MenuItems',
        component: MenuItems,
        props: (route) => ({ propName: route.query.filteredMenuItems })
      },
      {
        path: '/toppings', // Nested route for Toppings (if needed)
        name: 'Toppings',
        component: Toppings,
        props: true,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu,
  },
  // Add more routes for other pages if needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;