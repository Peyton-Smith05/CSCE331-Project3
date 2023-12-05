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
  
}
header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem; /* Add some padding */
}

.logo {
  width: auto; /* Adjust if necessary */
  height: 100%; /* Use 100% of the header height */
  max-height: 100px; /* Set a maximum height */
}
</style>

