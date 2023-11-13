<template>
  <div>
    <h1>Menu Items</h1>
    <ul>
      <li v-for="item in menu" :key="item.name">
        {{ item.name }} - {{ item.price }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MenuItems',
  data() {
    return {
      menu: [],
      error: null,
    };
  },
  created() {
    this.fetchMenu();
  },
  methods: {
    async fetchMenu() {
      try {
        const response = await axios.get('http://localhost:3000/menu-items/whats-new');
        this.menu = response.data;
      } catch (error) {
        console.error(error);
        this.error = 'Failed to load users.';
      }
    },
  },
};
</script>

<style>
/* Add styles for your component here */
</style>
