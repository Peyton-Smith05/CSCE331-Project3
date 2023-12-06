import { createRouter, createWebHistory } from 'vue-router';
import Cashier from './Cashier.vue';
import Customer from './Customer.vue';
import CustomerToppings from './CustomerToppings.vue';
import CashierToppings from './CashierToppings.vue';
import CashierMenuItems from './CashierMenuItems.vue';
import CustomerMenuItems from './CustomerMenuItems.vue';
import Login from './Login.vue';
import Checkout from './Checkout.vue';
import Manager from './Manager.vue';
import LandingPage from './LandingPage.vue';

import Menu from './Menu.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LandingPage, 
  },
  {
    path: '/cashier',
    name: 'Cashier',
    component: Cashier,
    children: [
      {
        path: '', 
        redirect: '/cashiermenuitems' 
      },
      {

        path: '/cashiermenuitems', 
        name: 'CashierMenuItems',
        component: CashierMenuItems,
        props: (route) => ({ propName: route.query.filteredMenuItems })

      },
      {
        path: '/cashiertoppings', 
        name: 'CashierToppings',
        component: CashierToppings,
        props: true,
      },
    ],
  },
  {
    path: '/customer',
    name: 'Customer',
    component: Cashier,
    children: [
      {
        path: '', 
        redirect: '/customermenuitems' 
      },
      {
        path: '/customermenuitems', 
        name: 'CustomerMenuItems',
        component: CustomerMenuItems,
        props: (route) => ({ propName: route.query.filteredMenuItems })
      },
      {
        path: '/customertoppings', 
        name: 'CustomerToppings',
        component: CustomerToppings,
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
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
  },
  {
    path: '/manager',
    name: "Manager",
    component: Manager,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;