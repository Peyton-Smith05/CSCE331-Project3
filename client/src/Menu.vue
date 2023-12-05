<template>
  <div class="menu">
    <div v-if="categories.length > 0" class="categories-grid">
      <div v-for="(category, index) in validCategories" :key="index" class="category" :style="getCategoryStyles(category)">
        <h2 class="category-title">{{ capitalize(category) }}</h2>
        <div v-if="filteredItems[category]" v-for="(item, itemIndex) in filteredItems[category]" :key="itemIndex" class="menu-item">
          <p>{{ removeSubstring(item.name, '_M') }} - ${{ item.price }}</p>
            <!-- Additional item details here -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const apiRedirect = "http://localhost:3000";

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
    filteredItems() {
      // Filter items based on the condition
      const filtered = {};
      for (const category in this.menuItems) {
        filtered[category] = this.menuItems[category].filter(item => !item.name.endsWith('_L'));
      }
      return filtered;
    },
  },
  methods: {
    removeSubstring(str, substr) {
      return str.replace(substr, '');
    },
    capitalize(str) {
      return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    },
    getCategoryStyles(category) {
      // Calculate height based on the number of items in each category
      const itemLength = this.filteredItems[category]?.length || 0;
      return {
        border: `1px solid #ccc`,
        borderRadius: '5px',
        padding: '20px', // Fixed padding
        height: `${itemLength > 0 ? itemLength * 50 + 'px' : 'auto'}`, // Adjust height based on item count
      };
    }
  },

  async mounted() {
    try {
      const categoriesResponse = await axios.get(apiRedirect + '/menu-items/category');
      this.categories = categoriesResponse.data.map(category => category.category);

      for (const category of this.categories) {
        if (category !== "what's new" && category !== "merchandise") {
          const fixedCategory = category.toLowerCase().replace(' ', '-');
          const itemsResponse = await axios.get(apiRedirect + `/menu-items/${fixedCategory}`);
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
  width: 95vw; /* Set a maximum width for the menu */
  height: 80vh;
  top: 20vh;
  left: 0;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr)); /* Ensure five columns */
  gap: 20px;
  max-width: 100vw; /* Set a maximum width for the grid */
  width: 100%;
  margin: 0 auto;
  padding: 20px; /* Add padding for grid items */
  box-sizing: border-box; /* Include padding in width and height */
}

.category-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.menu-item {
  margin-top: 10px;
}
</style>
