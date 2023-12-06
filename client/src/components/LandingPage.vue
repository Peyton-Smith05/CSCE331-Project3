<template>
  <!-- @vuese
  This template renders the landing page of the application, which includes three main components: Header, MainContent, and Footer. These components are organized in a flex column layout. -->
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
    /**
     * @vuese
     * The Landing component serves as the root component for the landing page of the application. It incorporates the Header, MainContent, and Footer components to construct the overall page layout.
     */
    components: {
      Header,
      MainContent,
      Footer
    }
  }
  </script>
  
<style>
/* @vuese
The .landing class provides the main styling for the landing page. It sets a background image, ensures the page occupies the full viewport, and arranges its child components (Header, MainContent, Footer) in a vertical flex column. */
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

  