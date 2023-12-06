<template>
  <div class="top-ribbon-tab" v-show="$route.path !== '/login' && $route.path !=='/manager'">
    <router-link to="/login">
      <button @click="goToLoginInterface()">Order Now</button>
    </router-link>
    <router-link to="/menu">
        <button @click="goToMenu()">View</button>
      </router-link>
  </div>

  <!-- Adding Top Ribbon for Manager Side.
  TODO: Create new route models to go to inventory and sales.
  -->
  <div class="manager-top-ribbon-tab" v-show="$route.path === '/manager'">
    <nav>
      <router-link to="/login">
        <button @click="goToLoginInterface()">Go Back</button>
      </router-link>
    </nav>
    
    <img id='KFTLogo' src="./assets/Kung_Fu_Tea_Official_Logo.png" alt="" @click="goToLanding()">
  </div>
</template>
  
  <script>
  export default {
    methods: {
      goToLanding() {
        this.$router.push('/');
      },
      goToLoginInterface() {
        this.$router.push('/login');
      },
      goToMenu() {
        this.$router.push('/menu');
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
    background-color: rgba(204, 204, 204, 1);
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
    background-color: #ff0000;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }

  .manager-top-ribbon-tab {
    background-color: #555;
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

  .manager-top-ribbon-tab button {
    background-color: #ff0000;
    color: #fff;
    border: none;
    padding: 10px 20px;
    margin: 10px;
    cursor: pointer;
  }

  #KFTLogo {
    position: absolute;
    top: 0;
    right: 2.5vw;
    width: 5vw;

  }
  </style>
  