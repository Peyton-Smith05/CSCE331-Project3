<template>
  <div class="landing-header">
    <header>
      <img src="./assets/Kung_Fu_Tea_Official_Logo.png" alt="Boba Tea Shop Logo" class="logo" />
      <button>Login</button>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header'
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
  z-index: 1;
}

header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 1rem;  */
}

.logo {
  width: auto; /* Adjust if necessary */
  height: 100%; /* Use 100% of the header height */
  max-height: 75px; /* Set a maximum height */
}
</style>

