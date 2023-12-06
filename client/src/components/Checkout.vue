<template>
    <div class="checkout-container">
      <button @click="toggle()" id="toggle_button">
        <span v-if="isActive" class="toggle__label">Traducir</span>
        <span v-if="! isActive" class="toggle__label">Translate</span>
      </button>
      <h1>{{checkoutDetails[0]}}</h1>
      <div class="cart-items">
        <h2>{{checkoutDetails[1]}}</h2>
        <ul>
          <li v-for="item in cartItems" :key="item.id">
            {{ item.name }} - ${{ item.price }} x {{ item.quantity }}
          </li>
        </ul>
      </div>
      <div class="cost-details">
        <p>{{checkoutDetails[2]}}: ${{ subtotal }}</p>
        <p>{{checkoutDetails[3]}}: ${{ tax }}</p>
        <p>{{checkoutDetails[4]}}: ${{ total }}</p>
        <label for="tip">{{checkoutDetails[5]}}:</label>
        <input type="number" id="tip" v-model="tip" placeholder="Enter tip amount"/>
      </div>
      <div class="pickup-time">
        <label for="pickup-time">{{checkoutDetails[6]}}:</label>
        <select id="pickup-time" v-model="selectedPickupTime">
          <option disabled value="">{{checkoutDetails[7]}}</option>
          <option v-for="time in pickupTimes" :key="time" :value="time">{{ time }}</option>
        </select>
      </div>

      <button @click="confirmOrder">{{checkoutDetails[8]}}</button>

    </div>
  </template>

<script>

const apiRedirect = (window.location.href.slice(0,17) == "http://localhost:") ? "http://localhost:3000" : "";
import axios from 'axios';


export default {
  /**
   * @vuese
   * A checkout component that handles the display and processing of an order, 
   * including item details, cost calculations, and order confirmation.
   */
  created() {
  if (this.$route.query.cartItems) {
      this.cartItems = JSON.parse(this.$route.query.cartItems);
      this.subtotal = parseFloat(JSON.parse(this.$route.query.total));
      this.tax = parseFloat(JSON.parse(this.$route.query.tax));
      this.empid = 1
    }
  },
  data() {
    return {
      /**
       * @vuese
       * Represents the current state for language translation.
       */
      currentState: false,
      /**
       * @vuese
       * Details and labels used in the checkout process.
       */
      checkoutDetails: ["Checkout", "Your Cart", "Subtotal", "Tax", "Total", "Tip", "Pickup Time", "Please select one", "Confirm Order"],
      /**
       * @vuese
       * The list of items in the cart.
       */
      cartItems: [], 
      /**
       * @vuese
       * Subtotal of the cart items.
       */
      subtotal: 0.0,
      /**
       * @vuese
       * Tax applicable on the cart items.
       */
      tax: 0.0, 
      /**
       * @vuese
       * Tip amount entered by the user.
       */
      tip: 0,
       /**
       * @vuese
       * Employee ID handling the order.
       */
      empid: 0,
      /**
       * @vuese
       * Selected pickup time for the order.
       */
      selectedPickupTime: '',
      /**
       * @vuese
       * Available pickup times for the order.
       */
      pickupTimes: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
      ],
    };
  },
  computed: {
    /**
     * @vuese
     * Computes the total cost of the order including the subtotal, tax, and tip.
     */
    total() {
      return (this.subtotal + this.tax).toFixed(2);
    },
  },
  methods: {
    /**
     * @vuese
     * Toggles the translation of checkout details between English and Spanish.
     */
    toggle() {
      if (this.currentState == true) {
        this.currentState = false;
        this.originalValue()
      } else {
        this.currentState = true;
        this.translateES()
        
      }
    },
    /**
     * @vuese
     * Confirms the order, posts it to a server, and redirects to the home page.
     */
    async confirmOrder() {
      console.log("Submitting...");
      // TODO: Fix time zone issue
      const now = new Date();
      const date = now.toISOString().split('T')[0];
      const time = now.toISOString().split('T')[1];
      try {
        const response = await axios.post(apiRedirect + '/submit-order', { drinks: this.cartItems, total: this.total, tip: this.tip, empid: this.empid, date: date, time: time });
        console.log(response.data);
        this.$router.push('/');
      } catch (error) {
        console.error(error);
      }
    },
    /**
     * @vuese
     * Translates checkout details to Spanish.
     */
    async translateES() {
      try {
        for (let i = 0; i < this.checkoutDetails.length; i++) {
          const translate_query = apiRedirect + "/translate/" + this.checkoutDetails[i];
          const response = await axios.get(translate_query);
          this.checkoutDetails[i] = response.data;
          console.log(response.data)
        }
      } catch (error) {
        console.error(error);
      }
    },
    /**
     * @vuese
     * Reverts the checkout details to their original values (English).
     */
    originalValue() {
      this.checkoutDetails = ["Checkout", "Your Cart", "Subtotal", "Tax", "Total", "Tip", "Pickup Time", "Please select one", "Confirm Order"]
    },
  },
};
</script>


<style scoped>
.checkout-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.cart-items ul {
  list-style: none;
  padding: 0;
}

.cart-items li {
  margin-bottom: 10px;
}

.cost-details {
  margin-top: 20px;
}

.pickup-time {
  margin-top: 20px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}

button:hover {
  background-color: #45a049;
}

input[type="number"] {
  margin-left: 10px;
}
</style>
