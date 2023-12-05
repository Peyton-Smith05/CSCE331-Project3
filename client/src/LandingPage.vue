<template>
    <div id="landing">
      <Header/>
      <MainContent/>
      <Footer/>
    </div>
  </template>
  
  <script>
  import Header from './LandingHeader.vue'
  import MainContent from './Carousel.vue'
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
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100vh;
}

#landing {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vh;
  margin: 0; 
}

/* Make sure to target the correct element or class for MainContent */
.main-content {
  flex-grow: 1; /* Grow to take available space */
  /* Make sure your background image covers the entire content area */
  background-size: cover; /* Cover the entire area */
  background-position: center; /* Center the background */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center content vertically */
  align-items: center; /* Center content horizontally */
  width:100%;
}
</style>

  