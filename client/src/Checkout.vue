<template>
    <div class="checkout-container">
      <button @click="toggle()" id="toggle_button">
        <span v-if="currentState" class="toggle__label">Traducir</span>
        <span v-if="! currentState" class="toggle__label">Translate</span>
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
      this.subtotal = parseFloat(JSON.parse(this.$route.query.total));
      this.tax = parseFloat(JSON.parse(this.$route.query.tax));
      this.empid = 1;
    }
  },
  data() {
    return {
      currentState: false,
      checkoutDetails: ["Checkout", "Your Cart", "Subtotal", "Tax", "Total", "Tip", "Pickup Time", "Please select one", "Confirm Order"],
      cartItems: [], 
      subtotal: 0.0,
      tax: 0.0, 
      tip: 0,
      empid: 0,
      selectedPickupTime: '',
      pickupTimes: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
      ],
    };
  },
  computed: {
    total() {
      return (this.subtotal + this.tax).toFixed(2);
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
