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
  display: flex;
  flex-direction: column;  
  justify-content: center; 
  align-items: center;     
}

</style>

  