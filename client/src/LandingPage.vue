<template>
    <div class="landing">
      <Header/>
      <MainContent/>
      <Footer/>
    </div>
  </template>
  
  <script>
  import Header from './LandingHeader.vue'
  import MainContent from './LandingContent.vue'
  import Footer from './LandingFooter.vue'
  
  export default {
    name: 'Landing',
    components: {
      Header,
      MainContent,
      Footer
    }
  }
  </script>
  
<style>
.landing {
  background-image: url('./assets/background.png');
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;           /* Enable flexbox */
  flex-direction: column;  /* Stack children vertically */
  justify-content: center; /* Center children horizontally in the container */
  align-items: center;     /* Center children vertically in the container */
}

</style>

  