import './assets/main.css'

import { createApp, provide, reactive } from 'vue'
import App from './App.vue'
import router from './router';
import { registerLicense } from '@syncfusion/ej2-base'
import vue3GoogleLogin from 'vue3-google-login';
const gAuthClientId = '442995720359-sfrl716t0nas1lp7i7b7lermvbevb1nt.apps.googleusercontent.com'

const app = createApp(App);

// Create a reactive global variable using provide
const globalData = reactive({
  textMod: 1,
});

// Provide the reactive object
app.provide('globalTextMod', globalData);

app.use(router);
app.use(vue3GoogleLogin, {
  clientId: gAuthClientId,
});

// Using free license to use calendar component found in Manager.vue
registerLicense("Ngo9BigBOggjHTQxAR8/V1NHaF1cWWhIYVBpR2Nbe05yflFDallRVAciSV9jS31SdEVnWX1ad3dXQGhbUA==");

app.mount('#app');
