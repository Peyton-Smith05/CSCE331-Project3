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
        <li v-for="menuItem in filteredMenuItems" :key="menuItem.id">
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
        Total: ${{ totalCost }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      menuItems: [
        { id: 1, name: "Pizza", price: 12.99, category: 1, quantity: 1 },
        { id: 2, name: "Hamburger", price: 9.99, category: 2, quantity: 1 },
        { id: 3, name: "Cheeseburger", price: 10.99, category: 2, quantity: 1 },
        { id: 4, name: "Garden Salad", price: 7.99, category: 3, quantity: 1 },
        { id: 5, name: "Caesar Salad", price: 8.99, category: 3, quantity: 1 },
      ],
      orderedItems: [],
      categories: [
        { id: 1, name: "Pizza" },
        { id: 2, name: "Burgers" },
        { id: 3, name: "Salads" },
      ],
      filteredMenuItems: [],
      selectedCategory: 0,
    };
  },
  created() {
    this.fetchCategory();
  },
  methods: {
    async fetchCategory() {
      try {
        const response = await axios.get('http://localhost:3000/menu-items/category');
        this.menu = response.data;
      } catch (error) {
        console.error(error);
        this.error = 'Failed to load users.';
      }
    },
    addItemToOrder(menuItem) {
      if (menuItem.quantity > 0) {
        const existingItem = this.orderedItems.find(
          (item) => item.id === menuItem.id
        );

        if (existingItem) {
          existingItem.quantity++;
        } else {
          this.orderedItems.push({ ...menuItem, quantity: 1 });
        }
      } else {
        alert("Item quantity must be greater than 0");
      }
    },
    removeItemFromOrder(orderItem) {
      if (orderItem.quantity > 1) {
        orderItem.quantity--;
      } else {
        this.orderedItems = this.orderedItems.filter(
          (item) => item.id !== orderItem.id
        );
      }
    },
    filterByCategory(categoryId) {
      this.selectedCategory = categoryId;
      if (categoryId === 0) {
        this.filteredMenuItems = this.menuItems;
      } else {
        this.filteredMenuItems = this.menuItems.filter(
          (item) => item.category === categoryId
        );
      }
    },
  },
  computed: {
    totalCost() {
      return this.orderedItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
    },
  },
  mounted() {
    this.filteredMenuItems = this.menuItems;
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

.menu-items,
.ordered-items {
  flex: 1;
  padding: 20px;
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