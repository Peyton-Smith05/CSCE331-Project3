import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import vue3GoogleLogin from 'vue3-google-login';
const gAuthClientId = '442995720359-sfrl716t0nas1lp7i7b7lermvbevb1nt.apps.googleusercontent.com'
import store from './store';

createApp(App)
  .use(router) // Use the Vue Router
  .use(vue3GoogleLogin, {
    clientId: gAuthClientId,
  }) // Use Google's API for OAuthentication.
  .use(store)
  .mount('#app');
