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
      <div class="menu-items">
        <h3>Menu Items</h3>
        <ul>
          <li v-for="menuItem in removeDuplicates(filteredMenuItems)" :key="menuItem.id">
            <div>
              {{ menuItem.name }} - ${{ menuItem.price }}
              <button @click="addItemToOrder(menuItem)">Add to Order</button>
            </div>
          </li>
        </ul>
      </div>
      <div class="ordered-items">
        <h3>Ordered Items</h3>
        <ul>
          <li v-for="orderItem in orderedItems" :key="orderItem.id">
            <div>
              {{ orderItem.name }} - ${{ orderItem.price }} - Quantity: {{ orderItem.quantity }}
              <button @click="removeItemFromOrder(orderItem)">Remove</button>
            </div>
          </li>
        </ul>
        <div class="total">
          Items: ${{ itemCost }}<br>
          Tax: ${{ parseFloat(taxCost).toFixed(2) }}<br>
          Total: ${{ parseFloat(totalCost).toFixed(2) }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        orderedItems: [],
        filteredMenuItems: [],
        selectedCategory: 0,
        respond: [],
        respondItems: [],
      };
    },
    created() {
      this.fetchCategory('http://localhost:3000/menu-items/category')
          // Call the second fetchData function or any other operations that depend on categories here
      this.fetchMenuItems('http://localhost:3000/menu-items'); // Replace with the appropriate URL
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
      addItemToOrder(menuItem) {
        //if (menuItem.quantity > 0) {
          const existingItem = this.orderedItems.find(
            (item) => item.id === menuItem.id
          );

          if (existingItem !== undefined) {
            existingItem.quantity++;
            console.log("Selection passes on true side!");
          } else {
            this.orderedItems.push({ ...menuItem, quantity: 1 });
            console.log("Selection passes on false side!");
          }
        //} else {
        //  alert("Item quantity must be greater than 0");
        //}
      },
      removeItemFromOrder(orderItem) {
        if (orderItem.quantity > 1) {
          orderItem.quantity--;
        } else {
          this.orderedItems.pop({ ...orderItem, quantity: 1 });
        }
      },
      filterByCategory(categoryId) {
        this.selectedCategory = categoryId;
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
        return this.respondItems.filter(item => item.category !== "topping").map((item, index) => {
        const matchingCategory = this.categories.find(category => category.name === item.category);
        const categoryId = matchingCategory ? matchingCategory.id : 0; // Default to 0 if no matching category is found
        return {
          id: index + 1,
          name: this.cleanItemName(item.name),
          price: item.price,
          category: categoryId,
          quantity: 1,
        };
      });
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
    },
    mounted() {
      this.filteredMenuItems = this.menuItems
      axios.get('http://localhost:3000/api/menu-items')
        .then((response) => {
          this.menuItems = response.data;
          this.filteredMenuItems = this.menuItems;
        })
        .catch((error) => {
          console.error('error fetching menu items:', error);
        })
    },
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
    flex: 1;
    padding: 20px;
    height: 100%;
    width: 45vw;
    border: 1px solid #ccc;
  }
  
  .total {
    text-align: right;
    font-weight: bold;
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
