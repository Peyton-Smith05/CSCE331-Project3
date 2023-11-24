import { createRouter, createWebHistory } from 'vue-router';
import Cashier from './Cashier.vue';
import Toppings from './Toppings.vue';
import MenuItems from './Menu-Items.vue';
import Carousel from './Carousel.vue';
import Login from './Login.vue';
import Checkout from './Checkout.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Carousel, 
  },
  {
    path: '/cashier',
    name: 'Cashier',
    component: Cashier,
    children: [
      {
        path: '', 
        redirect: '/menuitems' 
      },
      {
        path: '/menuitems', 
        name: 'MenuItems',
        component: MenuItems,
        props: (route) => ({ propName: route.query.filteredMenuItems })
      },
      {
        path: '/toppings', 
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
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;