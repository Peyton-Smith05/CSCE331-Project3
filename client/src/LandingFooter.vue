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
  width: 100%;
  padding: 1rem; /* Add some padding */
  text-align: center; /* Center the text */
}
</style>
