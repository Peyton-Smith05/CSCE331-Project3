import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

createApp(App).mount('#app')
  .use(router) // Use the Vue Router
  .mount('#app');
