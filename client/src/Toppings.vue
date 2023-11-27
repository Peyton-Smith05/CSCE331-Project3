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
          <div v-for="option in toppingsOptions" :key="option.id">
            <input type="checkbox" :id="option.id" :value="option" v-model="selectedToppings">
            <label :for="option">{{ option.name }} - ${{ option.price }}</label>
          </div>
        </div>
  
      </div>
      <button class="done-button" @click="submitOrder">Done</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  const apiRedirect = (window.location.href.slice(0,17) == "http://localhost:") ? "http://localhost:3000" : "";
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
        respond: [],
      };
    },
    created(){
      const toppings_api = apiRedirect + "/menu-items/topping";
      
      this.fetchToppings(toppings_api);

    },
    methods: {
      async fetchToppings(whatToFetch) {
        try {
          const response = await axios.get(whatToFetch);
          this.respond = response.data;
        } catch (error) {
          console.error(error);
          this.error = 'Failed to load users.';
        }
      },
      closeToppingInterface() {
        // Handle closing of the topping interface
        this.$router.push({ name: 'MenuItems', params: {} });
      },
      submitOrder() {
        this.$emit('sendOrder', this.selectedSize, this.selectedTemperature, this.selectedSugarLevel, this.selectedIceLevel, this.selectedToppings);
        this.$router.push({ name: 'MenuItems', params: {} });
      },
      // Add methods to handle selection and processing of toppings
    },
    computed: {
      toppingsOptions() {
        return this.respond.map((item) => {
        return {
          id: item.menuid,
          name: item.name,
          price: item.price,
          quantity: 1,
        };
      });
      },
    },
  };
  </script>

<style scoped>
.topping-interface {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff; 
  border-radius: 8px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  font-family: 'Helvetica Neue', Arial, sans-serif; 
  color: black;
}

.exit-button {
  background-color: transparent;
  border: none;
  color: #333; 
  font-size: 1.5rem; 
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.done-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff0000; 
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  display: block;
  width: 100%;
  box-sizing: border-box; 
  transition: background-color 0.3s ease; 
}

.done-button:hover {
  background-color: #ff0000; 
}

.topping-options h2 {
  text-align: center; 
  margin-bottom: 1.5rem;
}

.topping-category {
  margin-bottom: 1.5rem; 
}

.topping-category h3 {
  margin-bottom: 0.5rem;
}

.topping-category div {
  margin-bottom: 0.5rem; 
}

input[type="radio"], input[type="checkbox"] {
  margin-right: 0.5rem;
}

label {
  font-weight: normal;
  cursor: pointer;
}

@media (max-width: 768px) {
  .topping-interface {
    width: 90vw;
    margin: 1rem auto;
    padding: 1rem;
  }
}

</style>
  