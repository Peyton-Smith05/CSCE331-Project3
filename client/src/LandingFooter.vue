<template>
  <footer>
    <div class="weather-input">
      <input type="text" placeholder="Enter location" class="rounded-textbox" v-model="location"/>
      <button @click="getWeather" class="weather-button">Get Weather</button>
      <p v-if="weatherInfo">Weather: {{ weatherInfo.weather[0].main }}, Temperature: {{ weatherInfo.main.temp }} F, Feels Like: {{ weatherInfo.main.feels_like }} F </p>
    </div>
  </footer>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Footer',
  data() {
    return {
      weatherInfo: '',
      location: '',
    }
  },
  methods: {
    async getWeather() {
      console.log(this.location);
      const request = 'https://api.openweathermap.org/data/2.5/weather?q=' + this.location + '&appid=cb79dd33fa3e6a684d5325a7c31b1e4b&units=imperial';
      // Replace with actual API call and handle user location
      const response = await axios.get(request);
      console.log(response.data);
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

.weather-input {
  display: flex;
  align-items: center;
}

.rounded-textbox {
  border: 1px solid #ccc;
  border-radius: 15px; /* Rounded corners */
  padding: 10px 15px;
  margin-right: 10px; /* Spacing between textbox and button */
}

.weather-button {
  background-color: #fff;
  color: black;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.weather-button:hover {
  background-color: #FFefff;
}
</style>
