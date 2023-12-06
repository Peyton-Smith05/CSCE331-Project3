<template>
  <footer>
    <div class="weather-input">
      <input type="text" placeholder="Enter location" class="rounded-textbox" v-model="location"/>
      <button :style="{ fontSize: buttonFontSize }" @click="getWeather" class="weather-button">Get Weather</button>
      <p v-if="weatherInfo">Weather: {{ weatherInfo.weather[0].main }}, Temperature: {{ weatherInfo.main.temp }} F, Feels Like: {{ weatherInfo.main.feels_like }} F </p>
    </div>
  </footer>
</template>

<script>
import axios from 'axios';
import { inject, ref, computed } from 'vue';

export default {
  name: 'Footer',
  setup() {
    // Inject the global variable 'globalTextMod'
    const globalData = inject('globalTextMod');

    // Define reactive variables using ref
    const weatherInfo = ref('');
    const location = ref('');

    // Define methods
    async function getWeather() {
      const request = `https://api.openweathermap.org/data/2.5/weather?q=${location.value}&appid=cb79dd33fa3e6a684d5325a7c31b1e4b&units=imperial`;
      const response = await axios.get(request);
      weatherInfo.value = response.data;
    }

    // Define computed properties
    const buttonFontSize = computed(() => {
      const textSize = 13;
      const tSize = globalData ? globalData.textMod : 1;
      return `${textSize * tSize}px`;
    });

    // Return values to be used in the template
    return {
      weatherInfo,
      location,
      getWeather,
      buttonFontSize,
    };
  },
};
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
  justify-content: space-between;
}

.weather-input p{
  color: black;
  background-color: #fff;
  border-radius: 2px;
  padding: 5px;
  margin-left: auto; 
  min-width: 20%; 
}

.rounded-textbox {
  border: 1px solid #ccc;
  border-radius: 15px; 
  padding: 10px 15px;
  margin-right: 10px;
}

.weather-button {
  background-color: #fff;
  color: black;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-right: auto;
}

.weather-button:hover {
  background-color: #FFefff;
}
</style>
