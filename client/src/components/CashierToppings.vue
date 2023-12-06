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
const apiRedirect = (window.location.href.slice(0, 17) == "http://localhost:") ? "http://localhost:3000" : "";

export default {
  /**
   * @vuese
   * A component that allows users to select various options for their order,
   * such as size, temperature, sugar level, ice level, and toppings.
   */
  data() {
    return {
      /**
       * @vuese
       * Selected options for the order.
       */
      selectedSize: '',
      selectedTemperature: '',
      selectedSugarLevel: '',
      selectedIceLevel: '',
      selectedToppings: [],
      /**
       * @vuese
       * Available options for each category.
       */
      sizeOptions: ['Medium', 'Large'],
      temperatureOptions: ['Hot', 'Cold'],
      sugarLevelOptions: ['30%', '50%', '70%', '100%', '120%'],
      iceLevelOptions: ['None', 'Less', 'Regular'],
      respond: [],
    };
  },
  created() {
    /**
     * @vuese
     * Fetches topping options from the server on component creation.
     */
    const toppings_api = apiRedirect + "/menu-items/topping";

    this.fetchToppings(toppings_api);

  },
  methods: {
    /**
     * @vuese
     * Fetches topping options from the server.
     * @arg whatToFetch - The API endpoint to fetch toppings from.
     */
    async fetchToppings(whatToFetch) {
      try {
        const response = await axios.get(whatToFetch);
        this.respond = response.data;
      } catch (error) {
        console.error(error);
        this.error = 'Failed to load users.';
      }
    },
    /**
     * @vuese
     * Closes the topping selection interface.
     */
    closeToppingInterface() {
      // Handle closing of the topping interface
      this.$router.push({ name: 'CashierMenuItems', params: {} });
    },
    /**
     * @vuese
     * Submits the selected order options and navigates back to the menu items page.
     */
    submitOrder() {
      this.$emit('sendOrder', this.selectedSize, this.selectedTemperature, this.selectedSugarLevel, this.selectedIceLevel, this.selectedToppings);
      this.$router.push({ name: 'CashierMenuItems', params: {} });
    },
    // Add methods to handle selection and processing of toppings
  },
  computed: {
    /**
     * @vuese
     * Computes and returns the topping options available for selection.
     */
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

.done-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
  