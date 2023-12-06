<template>
    <div class="checkout-container">
      <button @click="toggle()" id="toggle_button">
        <span v-if="isActive" class="toggle__label">modo español</span>
        <span v-if="! isActive" class="toggle__label">English mode</span>
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


  created() {
  if (this.$route.query.cartItems) {
      this.cartItems = JSON.parse(this.$route.query.cartItems);
    }
  },
  data() {
    return {
      currentState: false,
      checkoutDetails: ["Checkout", "Your Cart", "Subtotal", "Tax", "Total", "Tip", "Pickup Time", "Please select one", "Confirm Order"],
      cartItems: [], 
      tip: 0,
      selectedPickupTime: '',
      pickupTimes: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
      ],
    };
  },
  computed: {
    subtotal() {
      return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
    tax() {
      return this.subtotal * 0.07; // Assuming 7% tax
    },
    total() {
      return this.subtotal + this.tax + parseFloat(this.tip);
    },
  },
  methods: {
    toggle() {
      if (this.currentState == true) {
        this.currentState = false;
        this.originalValue()
      } else {
        this.currentState = true;
        this.translateES()
        
      }
    },
    confirmOrder() {
      // Logic to send order details to backend API
      console.log('Order confirmed with details:', this.cartItems, this.total, this.selectedPickupTime);
      // Implement API call here
    },
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
