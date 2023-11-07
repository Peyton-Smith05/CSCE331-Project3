<template>
    <div class="top-ribbon-tab">
      <button @click="goToCashierInterface">Go to Cashier</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goToCashierInterface() {
        // Navigate to the cashier interface page using Vue Router
        this.$router.push('/cashier');
      },
    },
  };
  </script>
  
  <style scoped>
  .top-ribbon-tab {
    background-color: #ccc;
    padding: 10px;
    width: 100vw;
    height: 10vh;
    margin: 0; /* Remove any default margin */
    position: fixed; /* Add position: fixed to ensure it stays at the top */
    top: 0; /* Position it at the top of the viewport */
    left: 0;
  }
  
  .top-ribbon-tab button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }
  </style>
  