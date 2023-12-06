<template>
  <div class="cashier-interface">
    <div class="ribbon-tab">
      <ul>
        <li @click="filterByCategory(0)" :class="{ selected: selectedCategory === 0 }">{{ this.all }}</li>
        <li v-for="category in categoriesList" :key="category.id" :class="{ selected: selectedCategory === category.id}">
          <a @click="filterByCategory(category.id)">{{ category.name }}</a>
        </li>
      </ul>
    </div>
    <div class="menu-items-wrapper">
      <button @click="toggle()" id="toggle_button">
        <span v-if="isActive" class="toggle__label">modo español</span>
        <span v-if="! isActive" class="toggle__label">English mode</span>
      </button>
      <router-view :options="options" :optionDetails="optionDetails" :filteredMenuItems="filteredMenuItems" :addToOrder="addToOrder" @itemChosen="selectItem" @sendOrder="addItemToOrder"></router-view>
    </div>
    <div class="ordered-items-wrapper">
      <div class="ordered-items">
        <h3>{{orderDetails[0]}}</h3>
        <ul>
          <li v-for="orderItem in orderedItems" :key="orderItem.id">
            <div>
              <span @click="toggleDropdown(orderItem)">
                {{ orderItem.name }} - ${{ orderItem.price }} - {{orderDetails[1]}}: {{ orderItem.quantity }}
              </span>
              <div v-if="orderItem.showDetails" class="item-details">
                <p>{{orderDetails[2]}}: {{ orderItem.size }}</p>
                <p>{{orderDetails[3]}}: {{ orderItem.temp }}</p>
                <p>{{orderDetails[4]}}: {{ orderItem.sugarLevel }}</p>
                <p>{{orderDetails[5]}}: {{ orderItem.iceLevel }}</p>
                <p>{{orderDetails[6]}}:</p>
                <ul>
                  <li v-for="topping in orderItem.toppings" :key="topping.id">
                  <p>{{ topping.name }} {{ topping.quantity }}</p>
                  </li>
                </ul>
                <!-- Add other details as needed -->
              </div>
              <button @click="removeItemFromOrder(orderItem)">{{pay[4]}}</button>
            </div>
          </li>
        </ul>
        <div class="total">
          {{ pay[0] }}: ${{ itemCost }}<br>
          {{ pay[1] }}: ${{ taxCost }}<br>
          {{ pay[2] }}: ${{ totalCost }}
        </div>
      </div>
    </div>
    <div class="footer">
        <button 
            class="checkout-button" 
            :disabled="!isCartNotEmpty" 
            :class="{ 'inactive': !isCartNotEmpty }"
            @click="goToCheckout">
            {{ pay[3] }}
        </button>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
import { ref, onMounted } from 'vue'


  const apiRedirect = (window.location.href.slice(0,17) == "http://localhost:") ? "http://localhost:3000" : "";

export default {
  data() {
    return {
      currentState: false,
      options: ["Order Details", "Size", "Temperature", "Sugar Level", "Ice Level", "Toppings", "Done"],
      optionDetails: ['Medium', 'Large', 'Hot', 'Cold', 'None', 'Less', 'Regular'],
      pay: ["Items", "Tax", "Total", "checkout", "remove"],
      orderDetails: ["Ordered Items", "Quantity", "Size", "Temp", "Sugar Level", "Ice Level", "Toppings"],
      all: "All",
      addToOrder: "Add To Order",
      categoriesList: [],
      orderedItems: [],
      filteredMenuItems: [],
      selectedCategory: 0,
      respond: [],
      respondItems: [],
      itemsID: 0,
      selectedItem: {
        id: -1,
        name: '',
        price: 0.0,
        category: 0,
        quantity: 0,
        size: '',
        sugarLevel: 0,
        iceLevel: '',
        temp: '',
        toppings: [],
        showDetails: false,
        itemID: 0,
      }
    };
  },
  created() {
    const category_api = apiRedirect + "/menu-items/category";
    this.fetchCategory(category_api);
    const menuItems_api = apiRedirect + "/menu-items";
    this.fetchMenuItems(menuItems_api)
      .then(() => {
        this.filterByCategory(0); 
      });
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
    async translateES() {
      try {

        for (let i = 0; i < this.orderDetails.length; i++) {
          const translate_query = apiRedirect + "/translate/" + this.orderDetails[i];
          const response = await axios.get(translate_query);
          this.orderDetails[i] = response.data;
        }

        const translate_query = apiRedirect + "/translate/" + this.all;
        const response = await axios.get(translate_query);
        this.all = response.data

        const translate_query_addToOrder = apiRedirect + "/translate/" + this.addToOrder;
        const response_addToOrder = await axios.get(translate_query_addToOrder);
        this.addToOrder = response_addToOrder.data

        for (let i = 0; i < this.pay.length; i++) {
          const translate_query = apiRedirect + "/translate/" + this.pay[i];
          const response = await axios.get(translate_query);
          this.pay[i] = response.data
        }

        for (let i = 0; i < this.categoriesList.length; i++) {
          const translate_query = apiRedirect + "/translate/" + this.categoriesList[i].name;
          const response = await axios.get(translate_query);
          this.categoriesList[i].name = response.data;
        }

        for (let i = 0; i < this.options.length; i++) {
          const translate_query = apiRedirect + "/translate/" + this.options[i];
          const response = await axios.get(translate_query);
          this.options[i] = response.data;
        }

        for (let i = 0; i < this.optionDetails.length; i++) {
          const translate_query = apiRedirect + "/translate/" + this.optionDetails[i];
          const response = await axios.get(translate_query);
          this.optionDetails[i] = response.data;
        }

        for (let i = 0; i < this.filteredMenuItems.length; i++) {
          const translate_query = apiRedirect + "/translate/" + this.filteredMenuItems[i].name;
          const response = await axios.get(translate_query);
          this.filteredMenuItems[i].name = response.data;
        }

        for (let i = 0; i < this.checkoutDetails.length; i++) {
          const translate_query = apiRedirect + "/translate/" + this.checkoutDetails[i];
          const response = await axios.get(translate_query);
          this.checkoutDetails[i] = response.data;
        }

        

      } catch (error) {
        console.error(error);
      }
    },
    async originalValue() {
      try {
        this.all = "All";
        this.pay = ["Items", "Tax", "Total", "checkout", "remove"];
        this.addToOrder = "Add To Order";
        this.options = ["Order Details", "Size", "Temperature", "Sugar Level", "Ice Level", "Toppings", "Done"]
        this.optionDetails = ['Medium', 'Large', 'Hot', 'Cold', 'None', 'Less', 'Regular']
        this.categoriesList = this.respond.filter(category => category.category !== "topping").map((category, index) => ({
          id: index + 1,
          name: category.category,
        }));

        for (let i = 0; i < this.filteredMenuItems.length; i++) {
          const translate_query = apiRedirect + "/translateEnglish/" + this.filteredMenuItems[i].name;
          const response = await axios.get(translate_query);
          this.filteredMenuItems[i].name = response.data;
        }
        this.orderDetails = ["Ordered Items", "Quantity", "Size", "Temp", "Sugar Level", "Ice Level", "Toppings"]


      } catch (error) {
        console.error(error);
      }
    },
    async fetchCategory(whatToFetch) {
      try {
        const response = await axios.get(whatToFetch);
        this.respond = response.data;
      } catch (error) {
        console.error(error);
        this.error = 'Failed to load users.';
      }

    },
    created() {
      const category_api = apiRedirect + "/menu-items/category";
      this.fetchCategory(category_api);
          // Call the second fetchData function or any other operations that depend on categories here
      const menuItems_api = apiRedirect + "/menu-items";
      this.fetchMenuItems(menuItems_api)
        .then(() => {
          this.filterByCategory(0); // After fetching menu items, apply filtering
        });
      this.empid = JSON.parse(this.$route.query.empid);
    },
    methods: {
      async fetchCategory(whatToFetch) {
        try {
          const response = await axios.get(whatToFetch);
          this.respond = response.data;
        } catch (error) {
          console.error(error);
          this.error = 'Failed to load users.';
        }
      },
      async fetchMenuItems(whatToFetch) {
          try {
            const response = await axios.get(whatToFetch);
            this.respondItems = response.data;
          } catch (error) {
            console.error(error);
            this.error = 'Failed to load users.';
          }
      },
      addItemToOrder(selectedSize, selectedTemperature, selectedSugarLevel, selectedIceLevel, selectedToppings) {
          const existingItem = this.orderedItems.find(
            (item) => (item.id === this.selectedItem.id && item.size === selectedSize && item.temp === selectedTemperature && item.sugarLevel === selectedSugarLevel && item.iceLevel === selectedIceLevel && this.arrayCompare(item.toppings, selectedToppings))
          );

          console.log("New Order: " + this.selectedItem.id + " "+ selectedSize + " " + selectedTemperature + " " + selectedSugarLevel + " " + selectedIceLevel + " " + selectedToppings);

          console.log(existingItem);

          if (existingItem != undefined) { 
            existingItem.quantity++;
            console.log("Increase Quantity");
          } else {
            this.selectedItem.size = selectedSize;
            this.selectedItem.sugarLevel = selectedSugarLevel;
            this.selectedItem.iceLevel = selectedIceLevel;
            this.selectedItem.temp = selectedTemperature;
            this.selectedItem.toppings = selectedToppings;
            this.selectedItem.showDetails = false;
            this.selectedItem.itemID = this.itemsID;
            this.orderedItems.push(Object.assign({}, this.selectedItem));
            this.itemsID++;
            console.log("New Item");
          }
      },
      arrayCompare(arr1, arr2){
        if (arr1.length !== arr2.length) {
          return false;
        }
        for (let i = 0; i < arr1.length; i++) {
          // Compare properties of each object in the array
          if (arr1[i].id !== arr2[i].id || arr1[i].quantity !== arr2[i].quantity) {
            return false;
          }
        }
        
        return true;
      },

    removeItemFromOrder(orderItem) {
      if (orderItem.quantity > 1) {
        orderItem.quantity--;
      } else {
        this.orderedItems = this.orderedItems.filter(
          (item) => item.itemID !== orderItem.itemID
        );
      }
    },
    removeDuplicates(menuItems) {
      let noDupMenu = [];
      let UniqueItems = {};
      for(let index in menuItems) {
        let itemName = menuItems[index]['name'];
        UniqueItems[itemName] = menuItems[index];
      }
      
      for( let noDupItem in UniqueItems) {
        noDupMenu.push(UniqueItems[noDupItem]);
      }
      return noDupMenu
    },
    filterByCategory(categoryId) {
      this.selectedCategory = categoryId
      if (categoryId === 0) {
        this.filteredMenuItems = this.menuItems;
      } else {
        this.filteredMenuItems = this.menuItems.filter(
          (item) => item.category === categoryId
        )
      }
    },
    removeDuplicates(menuItems) {
      let noDupMenu = [];
      let UniqueItems = {};
      for(let index in menuItems) {
        let itemName = menuItems[index]['name'];
        UniqueItems[itemName] = menuItems[index];
      }
      
      for( let noDupItem in UniqueItems) {
        noDupMenu.push(UniqueItems[noDupItem]);
      }
      return noDupMenu
    },
    cleanItemName(item_name) {
      if(item_name[item_name.length - 1] == 'M' || item_name[item_name.length - 1] == 'L') {
        item_name = item_name.substring(0, item_name.length - 2)
      }
      return item_name;
    },
    selectItem(item){
      this.selectedItem = item;
    },
    toggleDropdown(orderItem){
      orderItem.showDetails = !orderItem.showDetails;
    },
    goToCheckout() {
      this.$router.push({ 
        name: 'Checkout', 
        query: { 
          cartItems: JSON.stringify(this.orderedItems),
          total: JSON.stringify(this.totalCost),
          tax: JSON.stringify(this.taxCost)
        },
    });
  }
  },
  computed: {
    isActive() {
          return this.currentState;
    },
    checkedValue: {
        get() {
            return this.currentState
        },
        set(newValue) {
            this.currentState = newValue;
        }
    },
    itemCost() {
      return this.orderedItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
    },
    categories() {
      this.categoriesList = this.respond.filter(category => category.category !== "topping").map((category, index) => ({
        id: index + 1,
        name: category.category,
      }));
      return this.respond.filter(category => category.category !== "topping").map((category, index) => ({
        id: index + 1,
        name: category.category,
      }));
    },
    menuItems() {
      return this.removeDuplicates(this.respondItems.filter(item => item.category !== "topping").map((item, index) => {
      const matchingCategory = this.categories.find(category => category.name === item.category);
      const categoryId = matchingCategory ? matchingCategory.id : 0; // Default to 0 if no matching category is found
      return {
        id: index + 1,
        name: this.cleanItemName(item.name),
        price: item.price,
        category: categoryId,
        quantity: 1,
      };
    }))},
    taxCost() {
      const tax = this.orderedItems.reduce((acc, item) => {
        return (acc + item.price * item.quantity) * 0.07;
      }, 0);
      return tax.toFixed(2);
    },
    totalCost() {
      const total = this.orderedItems.reduce((acc, item) => {
        return (acc + item.price * item.quantity) * 1.07;
      }, 0);
      return total.toFixed(2);
    },
    isCartNotEmpty() {
        return this.orderedItems.length > 0;
    },
  }
}};

</script>
  
<style scoped>

.cashier-interface {
  display: flex;
  width: 100vw;
  height: 90vh;
  position: absolute;
  top: 10vh;
  left: 0vw;
  font-size: 16px;
  font-family: 'Arial', sans-serif;
}
.menu-items {
  overflow: auto;
}

.menu-items-wrapper {
  flex: 1 1 70%;
  padding: 0 20px;  
  overflow-y: auto; 
}

.ordered-items-wrapper {
  flex: 1 1 20%;
  background: #333; /* White background */
  padding: 20px;
  border-radius: 8px; /* Rounded corners for the container */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  margin-top: 20px;
  color: #fff;
}

.ordered-items h3 {
text-align: center; /* Center the heading */
color: #333; /* Dark grey color for text */
margin-bottom: 1rem;
}

.ordered-items ul {
list-style-type: none; /* Remove default list styling */
padding: 0;
margin: 0;
}

.ordered-items li {
padding: 10px;
border-bottom: 1px solid #fff; /* Light border for each item */
cursor: pointer;
transition: background-color 0.3s ease; /* Smooth transition for hover effect */
}

.ordered-items li:hover {
background-color: #000; /* Slight highlight on hover */
}

.ordered-items li div {
display: flex;
align-items: center;
justify-content: space-between;
}

.ordered-items span {
font-weight: bold; /* Make the item name and quantity bold */
}

.item-details {
padding: 10px;
background: #000; /* Slightly different background for the dropdown */
border-radius: 4px; /* Rounded corners for the dropdown */
margin-top: 10px;
}

.item-details p {
margin: 5px 0; /* Spacing between details */
}

button {
padding: 5px 15px;
background-color: #e74c3c; /* Red color for remove button */
color: white;
border: none;
border-radius: 4px;
cursor: pointer;
transition: background-color 0.3s ease; /* Smooth transition for hover effect */
}

button:hover {
background-color: #c0392b; /* Darker red on hover */
}

.total {
margin-top: 20px;
text-align: right; /* Align the total to the right */
font-size: 1.1rem; /* Slightly larger font size for total */
font-weight: bold; /* Bold font for emphasis */
}

/* Responsive adjustments */
@media (max-width: 768px) {
.ordered-items li div {
  flex-direction: column;
  align-items: flex-start;
}
}

.ribbon-tab {
  flex: 1 1 10%;
  top: 0;
  left: 0;
  height: 90vh;
  top: 10vh;
  background-color: rgb(65, 65, 65);
  padding: 20px;
}

.ribbon-tab ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ribbon-tab li {
  margin-bottom: 10px;
}

.ribbon-tab li:first-child {
  display: block;
  padding: 5px;
  text-decoration: none;
  color: #fff;
  cursor: pointer; 
}

.ribbon-tab a {
  display: block;
  padding: 5px;
  text-decoration: none; 
  color: #fff;
  cursor: pointer; 
}

.ribbon-tab a.selected { 
  background-color: #ff0000;
  color: #fff;
}

.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #f5f5f5; /* Light grey background */
    padding: 10px 20px;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); /* Shadow at the top */
}


</style>

