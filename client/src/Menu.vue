<template>
    <div class="menu">
      <div v-if="categories.length > 0" class="categories-grid">
        <div v-for="(category, index) in validCategories" :key="index" class="category">
          <h2 class="category-title">{{ category }}</h2>
          <div v-for="(item, itemIndex) in menuItems[category]" :key="itemIndex" class="menu-item">
            <p>{{ item.name }} - ${{ item.price }}</p>
            <!-- Additional item details here -->
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  const apiRedirect = (window.location.href.slice(0, 17) === "http://localhost:") ? "http://localhost:3000" : "";
  
  export default {
    data() {
      return {
        categories: [],
        menuItems: {},
      };
    },
    computed: {
      validCategories() {
        return this.categories.filter(category => category !== "what's new" && category !== "merchandise");
      },
    },
    async mounted() {
      try {
        const categoriesResponse = await axios.get(apiRedirect + '/menu-items/category');
        this.categories = categoriesResponse.data.map(category => category.category);
  
        for (const category of this.categories) {
          if (category !== "what's new" && category !== "merchandise") {
            const itemsResponse = await axios.get(apiRedirect + `/menu-items/${category.toLowerCase().replace(' ', '-')}`);
            this.menuItems[category] = itemsResponse.data;
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
  };
  </script>
  
  <style scoped>

    .menu {
        width: 100vw; /* Set a maximum width for the menu */
        height: 80vh;
        top: 20vh;
        left: 0;
    }

    .categories-grid {
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr)); /* Ensure five columns */
        gap: 20px;
        max-width: 100vw; /* Set a maximum width for the grid */
        width: 100%;
        margin: 0 auto;
        padding: 20px; /* Add padding for grid items */
        box-sizing: border-box; /* Include padding in width and height */
    }
  
  .category {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
  }
  
  .category-title {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .menu-item {
    margin-top: 10px;
  }
  </style>
  