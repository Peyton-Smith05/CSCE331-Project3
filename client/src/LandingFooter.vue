<template>
  <footer>
    <p>Weather: {{ weatherInfo }}</p>
  </footer>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Footer',
  data() {
    return {
      weatherInfo: ''
    }
  },
  mounted() {
    this.getWeather();
  },
  methods: {
    async getWeather() {
      // Replace with actual API call and handle user location
      const response = await axios.get('api-url-to-get-weather');
      this.weatherInfo = response.data;
    }
  }
}
</script>

<style scoped>
footer {
  position: fixed; 
  bottom: 0; 
  left: 0;
  width: 100vw;
  padding: 1rem; 
  text-align: center; 
  background-color: rgba(235,12,67,255);
}
</style>
