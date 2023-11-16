<template>
    <div class="topping-interface">
      <div class="exit-button" @click="closeToppingInterface">X</div>
      <div class="topping-options">
        <h2>Select Toppings</h2>
  
        <!-- Size Category -->
        <div class="topping-category">
          <h3>Size</h3>
          <div v-for="option in sizeOptions" :key="option">
            <input type="radio" :id="option" :value="option" v-model="selectedSize">
            <label :for="option">{{ option }}</label>
          </div>
        </div>
  
        <!-- Temperature Category -->
        <div class="topping-category">
          <h3>Temperature</h3>
          <div v-for="option in temperatureOptions" :key="option">
            <input type="radio" :id="option" :value="option" v-model="selectedTemperature">
            <label :for="option">{{ option }}</label>
          </div>
        </div>
  
        <!-- Sugar Level Category -->
        <div class="topping-category">
          <h3>Sugar Level</h3>
          <div v-for="option in sugarLevelOptions" :key="option">
            <input type="radio" :id="option" :value="option" v-model="selectedSugarLevel">
            <label :for="option">{{ option }}</label>
          </div>
        </div>
  
        <!-- Ice Level Category -->
        <div class="topping-category">
          <h3>Ice Level</h3>
          <div v-for="option in iceLevelOptions" :key="option">
            <input type="radio" :id="option" :value="option" v-model="selectedIceLevel">
            <label :for="option">{{ option }}</label>
          </div>
        </div>
  
        <!-- Toppings Category -->
        <div class="topping-category">
          <h3>Toppings</h3>
          <div v-for="option in toppingsOptions" :key="option">
            <input type="checkbox" :id="option" :value="option" v-model="selectedToppings">
            <label :for="option">{{ option }}</label>
          </div>
        </div>
  
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedSize: '',
        selectedTemperature: '',
        selectedSugarLevel: '',
        selectedIceLevel: '',
        selectedToppings: [],
  
        sizeOptions: ['Medium', 'Large'],
        temperatureOptions: ['Hot', 'Cold'],
        sugarLevelOptions: ['30%', '50%', '70%', '100%', '120%'],
        iceLevelOptions: ['None', 'Less', 'Regular'],
        toppingsOptions: [
          'Mango Jelly', 'Brown Sugar Wow', 'Aloe Jelly', 'Milk Cap',
          'Nata Jelly', 'Bubble', 'Berry Crystal Bubble', 'Herbal Jelly'
        ],
      };
    },
    methods: {
      closeToppingInterface() {
        // Handle closing of the topping interface
        this.$router.push({ name: 'MenuItems', params: {} });
      },
      // Add methods to handle selection and processing of toppings
    },
  };
  </script>
  
  <style scoped>
  /* Add your CSS styles for the topping interface */
  /* Styling for the topping interface, categories, buttons, etc. */

  .topping-interface {
    padding: 20px 0; 
    width: 50vw;
    position: relative;
  }

  .exit-button {
  background-color: transparent;
  border: none;
  color: red;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}

  
  </style>
  