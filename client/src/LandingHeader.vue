<template>
  <div class="landing-header">
    <header>
      <img src="./assets/Kung_Fu_Tea_Official_Logo.png" alt="Boba Tea Shop Logo" class="logo" />
      <div class="buttons">
        <button @click="goToMenu">View Menu</button>
        <button @click="goToLogin">Login</button>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
    goToMenu() {
      this.$router.push('/menu');
    },
  }
}
</script>

<style scoped>

.landing-header {
  background-color: rgba(235,12,67,255);
  padding: 2px;
  z-index: 6;
  width: 100vw;
  height: 10vh;
  margin: 0; /* Remove any default margin */
  position: fixed; /* Add position: fixed to ensure it stays at the top */
  top: 0; /* Position it at the top of the viewport */
  left: 0;
  padding-right: 10px;
}

header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  width: auto; /* Adjust if necessary */
  height: 100%; /* Use 100% of the header height */
  max-height: 75px; /* Set a maximum height */
}

.landing button {
    background-color: #fff;
    color: #000;
    border: none;
    padding: 10px 10px;
    cursor: pointer;
}

.buttons {
  flex-direction: row;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
}
</style>

