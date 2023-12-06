<template>
  <div class="topping-interface">
    <div class="exit-button" @click="closeToppingInterface">X</div>
    <div class="topping-options">
      <h2>{{ options[0] }}</h2>

      <!-- Size Category -->
      <div class="topping-category">
        <h3>{{ options[1] }}</h3>
        <div v-for="(option, index) in sizeOptions" :key="option">
          <input type="radio" :id="option" :value="option" v-model="selectedSize">
          <label :for="option">{{ optionDetails[index] }}</label>
        </div>
      </div>

      <!-- Temperature Category -->
      <div class="topping-category">
        <h3>{{ options[2] }}</h3>
        <div v-for="(option, index) in temperatureOptions" :key="option">
          <input type="radio" :id="option" :value="option" v-model="selectedTemperature">
          <label :for="option">{{ optionDetails[index + 2] }}</label>
        </div>
      </div>

      <!-- Sugar Level Category -->
      <div class="topping-category">
        <h3>{{ options[3] }}</h3>
        <div v-for="(option, index) in sugarLevelOptions" :key="option">
          <input type="radio" :id="option" :value="option" v-model="selectedSugarLevel">
          <label :for="option">{{ option }}</label>
        </div>
      </div>

      <!-- Ice Level Category -->
      <div class="topping-category">
        <h3>{{ options[4] }}</h3>
        <div v-for="(option, index) in iceLevelOptions" :key="option">
          <input type="radio" :id="option" :value="option" v-model="selectedIceLevel">
          <label :for="option">{{ optionDetails[index + 4] }}</label>
        </div>
      </div>

      <!-- Toppings Category -->
      <div class="topping-category">
        <h3>{{ options[5] }}</h3>
        <div v-for="option in toppingsOptions" :key="option.id">
          <input type="checkbox" :id="option.id" :value="option" v-model="selectedToppings">
          <label :for="option">{{ option.name }} - ${{ option.price }}</label>
        </div>
      </div>

    </div>
    <button class="done-button" @click="submitOrder">{{ options[6] }}</button>
  </div>
</template>
  
<script>
import axios from 'axios';
// Determines the API redirect URL based on the window's location.
const apiRedirect = (window.location.href.slice(0, 17) == "http://localhost:") ? "http://localhost:3000" : "";
export default {
  /**
    * @vuese
    * This component is used for the customization of an order in a restaurant system. It allows the user to select size, temperature, sugar level, ice level, and toppings for their order. The component fetches toppings from an API and handles the submission of the customized order.
    */
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
      toppings_menu: [],
    };
  },
  props: {
    /**
     * @vuese
     * An array of strings representing the labels for different customization options and buttons.
     */
    options: {
      type: Array,
      default: () => ["Order Details", "Size", "Temperature", "Sugar Level", "Ice Level", "Toppings", "Done"]
    },
    /**
     * @vuese
     * An array of strings detailing the options available for size, temperature, ice level, etc.
     */
    optionDetails: {
      type: Array,
      default: () => ['Medium', 'Large', 'Hot', 'Cold', 'None', 'Less', 'Regular'],
    },
  },
  created() {
    // Fetches toppings from the API when the component is created.
    const toppings_api = apiRedirect + "/menu-items/topping";
    this.fetchToppings(toppings_api);
  },
  methods: {
    /**
     * @vuese
     * Fetches available toppings from the provided API endpoint.
     */
    async fetchToppings(whatToFetch) {
      try {
        const response = await axios.get(whatToFetch);
        this.toppings_menu = response.data;
      } catch (error) {
        console.error(error);
        this.error = 'Failed to load users.';
      }
    },
    /**
     * @vuese
     * Closes the topping interface and navigates back to the menu items page.
     */
    closeToppingInterface() {
      // Handle closing of the topping interface
      this.$router.push({ name: 'CustomerMenuItems', params: {} });
    },
    /**
     * @vuese
     * Submits the customized order and navigates back to the menu items page.
     */
    submitOrder() {
      let temp = parseInt(this.selectedSugarLevel.replace("%", ""));
      this.$emit('sendOrder', this.selectedSize, this.selectedTemperature, temp, this.selectedIceLevel, this.selectedToppings);
      this.$router.push({ name: 'CustomerMenuItems', params: {} });
    },
  },
  computed: {
    /**
     * @vuese
     * Computes the options for toppings based on the data fetched from the API.
     */
    toppingsOptions() {
      return this.toppings_menu.map((item) => {
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

input[type="radio"],
input[type="checkbox"] {
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
  