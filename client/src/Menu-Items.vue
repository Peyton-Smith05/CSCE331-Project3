<!-- <template>
    <div class="menu-items-wrapper">
        <div class="menu-items">
            <h3>Menu Items</h3>
            <ul>
            <li v-for="menuItem in filteredMenuItems" :key="menuItem.id">
                <div>
                {{ menuItem.name }} - ${{ menuItem.price }}
                <button @click="redirectToToppings(menuItem)">Add to Order</button>
                </div>
            </li>
            </ul>
        </div>
    </div>
</template> -->
<template>
  <div class="menu-items-wrapper">
    <div class="menu-items-grid">
      <div class="grid-container">
        <div class="grid-item" v-for="menuItem in filteredMenuItems" :key="menuItem.id">
          <img src="./assets/Tea_Tab.png" alt="Tea Image" class="menu-item-image"/>
          <div class="menu-item-details">
            <h4>{{ menuItem.name }}</h4>
            <p>${{ menuItem.price }}</p>
          </div>
          <button @click="redirectToToppings(menuItem)">Add to Order</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    filteredMenuItems: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    redirectToToppings(item) {
      this.$emit('itemChosen', item);
      this.$router.push({ name: 'Toppings', params: { } });
    },
  },
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
