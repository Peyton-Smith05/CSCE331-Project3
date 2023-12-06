<template>
    <div>
      <label for="textSizeSlider">Adjust Text Size:</label>
      <input
        id="textSizeSlider"
        type="range"
        min=".5"
        max="2"
        step=".1"
        :value="textMod"
        @input="updateTextSize" 
      />
    </div>
  </template>
  
  <script>
  import {inject } from 'vue';
  export default {
    setup() {

        const globalData = inject('globalTextMod');

        const updateTextSize = (event) => {
            globalData.textMod = event.target.value; // Update the global textSize value
        };

        return {
        updateTextSize,
        };
    },
};
  </script>
  
  <style scoped>
  /* Add any additional styling here */
  </style>
  