<template>
  <div class="cashier-interface">
    <div class="ribbon-tab">
      <ul>
        <li @click="filterByCategory(0)" :class="{ selected: selectedCategory === 0 }">All</li>
        <li v-for="category in categories" :key="category.id" :class="{ selected: selectedCategory === category.id}">
          <a @click="filterByCategory(category.id)">{{ category.name }}</a>
        </li>
      </ul>
    </div>
    <router-view :filteredMenuItems="filteredMenuItems" @itemChosen="selectItem" @sendOrder="addItemToOrder">

    </router-view>
    <div class="ordered-items-wrapper">
      <div class="ordered-items">
        <h3>Ordered Items</h3>
        <div class="total">
          Items: ${{ itemCost }}<br>
          Tax: ${{ parseFloat(taxCost).toFixed(2) }}<br>
          Total: ${{ parseFloat(totalCost).toFixed(2) }}
        </div>
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
                <!-- Add other details as needed -->
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
  </div>
</template>
  
  <script>
  import axios from 'axios';

  const apiRedirect = (window.location.href.slice(0,17) == "http://localhost:") ? "http://localhost:3000" : "";

  export default {
    data() {
      return {
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
          // Call the second fetchData function or any other operations that depend on categories here
      const menuItems_api = apiRedirect + "/menu-items";
      this.fetchMenuItems(menuItems_api)
        .then(() => {
          this.filterByCategory(0); // After fetching menu items, apply filtering
        });
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
      orderSubmission() {

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
    },
    computed: {
      itemCost() {
        return this.orderedItems.reduce((acc, item) => {
          return acc + item.price * item.quantity;
        }, 0);
      },
      categories() {
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
      }));
      },
      taxCost() {
        return this.orderedItems.reduce((acc, item) => {
          return (acc + item.price * item.quantity) * 0.07;
        }, 0);
      },
      totalCost() {
        return this.orderedItems.reduce((acc, item) => {
          return (acc + item.price * item.quantity) * 1.07;
        }, 0);
      }
    }
  };
  </script>
  
  <style scoped>
  .cashier-interface {
    display: flex;
    width: 90vw;
    height: 90vh;
    position: absolute;
    top: 10vh;
    left: 10vw;
  }
  .menu-items {
    overflow: auto;
    width: 45vw;
  }
  .ordered-items {
    padding: 20px 0; 
    width: 50vw;
    position: relative;
  }
  
  .total {
    position: absolute;
    top: 10;
    right: 0;
    text-align: right;
    font-weight: bold;
  }

  .menu-items-wrapper {
    flex: 1;
    padding: 0 20px; 
    border-left: 1px solid #ccc; 
    border-right: 1px solid #ccc; 
    overflow-y: auto; 
  }

  .ordered-items-wrapper {
    flex: 1;
    padding: 0 20px;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  .menu-items-wrapper {
    margin-right: 10px; 
  }
  
  .ribbon-tab {
    position: fixed;
    top: 0;
    left: 0;
    height: 90vh;
    width: 10vw;
    top: 10vh;
    background-color: #ccc;
    padding: 20px;
  }

  .indented-list {
    padding-left: 20px; /* Adjust as needed for indentation */
  }
  .indented-list p {
    margin-left: 20px; /* Adjust as needed for indentation */
  }
  
  .ribbon-tab ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .ribbon-tab li {
    margin-bottom: 10px;
  }
  
  .ribbon-tab li:first-child { /* Style the All category button */
    display: block;
    padding: 10px;
    text-decoration: none; /* Removed default text highlighting */
    color: #333;
    border: 1px solid #ccc;
    cursor: pointer; /* Added cursor pointer for clickability */
  }
  
  .ribbon-tab li.selected { /* Style the selected category button */
    background-color: #007bff;
    color: #fff;
    border: 1px solid #007bff;
  }
  
  .ribbon-tab a {
    display: block;
    padding: 10px;
    text-decoration: none; /* Removed default text highlighting */
    color: #333;
    cursor: pointer; /* Added cursor pointer for clickability */
  }
  
  .ribbon-tab a.selected { /* Style the selected category button */
    background-color: #007bff;
    color: #fff;
  }
  
  </style>
