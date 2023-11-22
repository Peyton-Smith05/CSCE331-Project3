<template>
    <div class="top-ribbon-tab" v-show="$route.path !== '/login'">
      <router-link to="/login">
        <button @click="goToLoginInterface()">Go to Cashier</button>
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goToLoginInterface() {
        this.$router.push('/login');
      },
      goToCashierInterface() {
        // Navigate to the cashier interface page using Vue Router
        console.log("Clicked")
        this.$router.push('/cashier');
      },
    },
  };
  </script>
  
  <style scoped>
  .top-ribbon-tab {
    background-color: rgba(204, 204, 204, 1);;
    padding: 10px;
    z-index: 6;
    width: 100vw;
    height: 10vh;
    margin: 0; /* Remove any default margin */
    position: fixed; /* Add position: fixed to ensure it stays at the top */
    top: 0; /* Position it at the top of the viewport */
    left: 0;
    z-index: 1;
  }
  
  .top-ribbon-tab button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }
  </style>
  