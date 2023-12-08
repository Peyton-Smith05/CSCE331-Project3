<template>
  <div class="menu-items-wrapper">
    
    <div class="menu-items-grid">
      <div class="grid-container">
        <div class="grid-item" v-for="menuItem in filteredMenuItems" :key="menuItem.id">
          <!-- <img src="./assets/Tea_Tab.png" alt="Tea Image" class="menu-item-image"/> -->
          <img v-if="menuItem.category === 1" src="./assets/menu_images/whats new.png" alt="Tea Image" class="menu-item-image"/>
          <img v-if="menuItem.category === 2" src="./assets/menu_images/milk tea.png" alt="Tea Image" class="menu-item-image"/>
          <img v-if="menuItem.category === 3" src="./assets/menu_images/merchandise.png" alt="Tea Image" class="menu-item-image"/>
          <img v-if="menuItem.category === 4" src="./assets/menu_images/slush.png" alt="Tea Image" class="menu-item-image"/>
          <img v-if="menuItem.category === 5" src="./assets/menu_images/classic.png" alt="Tea Image" class="menu-item-image"/>
          <img v-if="menuItem.category === 6" src="./assets/menu_images/milk cap.png" alt="Tea Image" class="menu-item-image"/>
          <img v-if="menuItem.category === 7" src="./assets/menu_images/yogurt.png" alt="Tea Image" class="menu-item-image"/>
          <img v-if="menuItem.category === 8" src="./assets/menu_images/espresso.png" alt="Tea Image" class="menu-item-image"/>
          <img v-if="menuItem.category === 9" src="./assets/menu_images/milk strike.png" alt="Tea Image" class="menu-item-image"/>
          <img v-if="menuItem.category === 10" src="./assets/menu_images/punch.png" alt="Tea Image" class="menu-item-image"/>
          <div class="menu-item-details">
            <h3>{{ menuItem.name }}</h3>
            <p>${{ menuItem.price }}</p>
          </div>
          <button @click="redirectToToppings(menuItem)">{{addToOrder}}</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
const apiRedirect = (window.location.href.slice(0,17) == "http://localhost:") ? "http://localhost:3000/api" : "/api";
export default {
  data() {    
    return {
      category: []
    }
  },
  props: {
    filteredMenuItems: {
      type: Array,
      default: () => [],
    },
    addToOrder: {
      type: String,
      default: () => "Add To Order",
    },
  },
  methods: {
    redirectToToppings(item) {
      this.$emit('itemChosen', item);
      this.$router.push({ name: 'CustomerToppings', params: { } });
    },
  },
  watch: {
    filteredMenuItems: function(newVal) { 
        this.category = newVal
    }
  }
};
</script>

<style scoped>
.menu-items-grid {
  padding: 20px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
}

.grid-item {
  border: 1px solid #ccc;
  background-color: #ccc;
  color: black;
  padding: 15px;
  text-align: center;
  border-radius: 5px;
}

.menu-item-image {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.menu-items-wrapper {
  flex: 1;
  padding: 0 20px; 
  border-left: 1px solid #ccc; 
  border-right: 1px solid #ccc; 
  overflow-y: auto; 
}

.menu-items-grid button {
    padding: 10px 20px;
    font-size: 16px;
    font-family: 'Arial', sans-serif;
    color: #fff;
    background-color: #ff0000;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
  }
</style>
