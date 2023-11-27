<template>
  <div class="cashier-interface">
    <div class="ribbon-tab">
      <!-- <ul>
        <li @click="filterByCategory(0)" :class="{ selected: selectedCategory === 0 }">All</li>
        <li v-for="category in categories" :key="category.id" :class="{ selected: selectedCategory === category.id }">
          <a @click="filterByCategory(category.id)">{{ category.name }}</a>
        </li>
      </ul> -->
      <ul>
        <li @click="filterByCategory(0)" :class="{ selected: selectedCategory === 0 }">All</li>
        <li v-for="category in categories" :key="category.id" :class="{ selected: selectedCategory === category.id }">
          <a @click="filterByCategory(category.id)">{{ category.name }}</a>
        </li>
      </ul>
    </div>
    <div class="menu-items-wrapper">
      <router-view :filteredMenuItems="filteredMenuItems" @itemChosen="selectItem"
        @sendOrder="addItemToOrder"></router-view>
    </div>
    <div class="ordered-items-wrapper">
      <div class="ordered-items">
        <h3>Ordered Items</h3>
        <ul>
          <li v-for="orderItem in orderedItems" :key="orderItem.id">
            <div>
              <span @click="toggleDropdown(orderItem)">
                {{ orderItem.name }} - ${{ orderItem.price }} - Quantity: {{ orderItem.quantity }}
              </span>
              <div v-if="orderItem.showDetails" class="item-details">
                <p>Size: {{ orderItem.size }}</p>
                <p>Temp: {{ orderItem.temp }}</p>
                <p>Sugar Level: {{ orderItem.sugarLevel }}</p>
                <p>Ice Level: {{ orderItem.iceLevel }}</p>
                <p>Toppings:</p>
                <ul>
                  <li v-for="topping in orderItem.toppings" :key="topping.id">
                    <p>{{ topping.name }} {{ topping.quantity }}</p>
                  </li>
                </ul>
              </div>
              <button @click="removeItemFromOrder(orderItem)">Remove</button>
            </div>
          </li>
        </ul>
        <div class="total">
          Items: ${{ itemCost }}<br>
          Tax: ${{ taxCost }}<br>
          Total: ${{ totalCost }}
        </div>
      </div>
    </div>
    <div class="footer">
      <button class="checkout-button" :disabled="!isCartNotEmpty" :class="{ 'inactive': !isCartNotEmpty }"
        @click="goToCheckout">
        Checkout
      </button>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';

const apiRedirect = (window.location.href.slice(0, 17) == "http://localhost:") ? "http://localhost:3000" : "";

export default {
  data() {
    return {
      orderedItems: [],
      filteredMenuItems: [],
      // selectedCategory: 0,
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
    
    this.$store.dispatch('menu/fetchMenuData');
    console.log(this.$store.getters['menu/allCategories']);
    console.log(this.$store.getters['menu/selectedCategory']);
  
    this.filterByCategory(0);

  },
  methods: { // NOTE: I am currently trying to change where they get the category and menu item data
    addItemToOrder(selectedSize, selectedTemperature, selectedSugarLevel, selectedIceLevel, selectedToppings) {
      const existingItem = this.orderedItems.find(
        (item) => (item.id === this.selectedItem.id && item.size === selectedSize && item.temp === selectedTemperature && item.sugarLevel === selectedSugarLevel && item.iceLevel === selectedIceLevel && this.arrayCompare(item.toppings, selectedToppings))
      );

      console.log("New Order: " + this.selectedItem.id + " " + selectedSize + " " + selectedTemperature + " " + selectedSugarLevel + " " + selectedIceLevel + " " + selectedToppings);

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
    arrayCompare(arr1, arr2) {
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
      for (let index in menuItems) {
        let itemName = menuItems[index]['name'];
        UniqueItems[itemName] = menuItems[index];
      }

      for (let noDupItem in UniqueItems) {
        noDupMenu.push(UniqueItems[noDupItem]);
      }
      return noDupMenu
    },
    filterByCategory(categoryId) {
      // this.selectedCategory = categoryId
      // if (categoryId === 0) {
      //   this.filteredMenuItems = this.menuItems;
      // } else {
      //   this.filteredMenuItems = this.menuItems.filter(
      //     (item) => item.category === categoryId
      //   )
      // }
      this.$store.dispatch('menu/changeSelectedCategory', categoryId);
    },
    removeDuplicates(menuItems) {
      let noDupMenu = [];
      let UniqueItems = {};
      for (let index in menuItems) {
        let itemName = menuItems[index]['name'];
        UniqueItems[itemName] = menuItems[index];
      }

      for (let noDupItem in UniqueItems) {
        noDupMenu.push(UniqueItems[noDupItem]);
      }
      return noDupMenu
    },
    orderSubmission() {

    },
    cleanItemName(item_name) {
      if (item_name[item_name.length - 1] == 'M' || item_name[item_name.length - 1] == 'L') {
        item_name = item_name.substring(0, item_name.length - 2)
      }
      return item_name;
    },
    selectItem(item) {
      this.selectedItem = item;
    },
    toggleDropdown(orderItem) {
      orderItem.showDetails = !orderItem.showDetails;
    },
    goToCheckout() {
      this.$router.push({
        name: 'Checkout',
        query: {
          cartItems: JSON.stringify(this.orderedItems),
          total: JSON.stringify(this.totalCost),
          tax: JSON.stringify(this.taxCost)
        }
      });
    }
  },
  computed: {
    itemCost() {
      return this.orderedItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
    },
    categories() {
      // return this.respond.filter(category => category.category !== "topping").map((category, index) => ({
      //   id: index + 1,
      //   name: category.category,
      // }));
      return this.$store.getters['menu/allCategories'];
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
      }));
    },
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
    selectedCategory() {
      return this.$store.state.menu.selectedCategory;
    }
  }
};
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
  background: #333;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  color: #fff;
}

.ordered-items h3 {
  text-align: center;
  color: #333;
  margin-bottom: 1rem;
}

.ordered-items ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.ordered-items li {
  padding: 10px;
  border-bottom: 1px solid #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.ordered-items li:hover {
  background-color: #000;
}

.ordered-items li div {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ordered-items span {
  font-weight: bold;
}

.item-details {
  padding: 10px;
  background: #000;
  border-radius: 4px;
  margin-top: 10px;
}

.item-details p {
  margin: 5px 0;
}

button {
  padding: 5px 15px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #c0392b;
}

.total {
  margin-top: 20px;
  text-align: right;
  font-size: 1.1rem;
  font-weight: bold;
}

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
  background-color: #f5f5f5;
  padding: 10px 20px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: flex-end;
}

.checkout-button {
  padding: 10px 20px;
  background-color: #ff1a1a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.checkout-button:hover {
  background-color: #dc6060;
}

.checkout-button.inactive {
  background-color: grey;
  cursor: not-allowed;
}</style>
