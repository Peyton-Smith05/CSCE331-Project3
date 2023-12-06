<template>
  <div class="menu">
    <div v-if="categories.length > 0" class="categories-grid">
      <div class="categories-container">
        <div class="category-column" v-for="(categoryGroup, index) in groupedCategories" :key="index">
          <div
            v-for="(category, catIndex) in categoryGroup"
            :key="catIndex"
            class="category"
            :style="getCategoryStyles(category)"
          >
            <h2 class="category-title">{{ capitalize(category) }}</h2>
            <div
              v-if="filteredItems[category]"
              v-for="(item, itemIndex) in filteredItems[category]"
              :key="itemIndex"
              class="menu-item"
            >
              <p>{{ removeSubstring(item.name, '_M') }} - ${{ item.price }}</p>
              <!-- Additional item details here -->
            </div>
          </div>
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
      columns: 4, // determines how many columns there are
      columnHeights: [],
    };
  },
  computed: {
    validCategories() {
      return this.categories.filter(category => category !== "what's new" && category !== "merchandise");
    },
    groupedCategories() {
      const result = [];
      const categories = [...this.validCategories];
      console.log(categories.length);
      const columnAmount = Math.floor(categories.length / 4);
      console.log(columnAmount);
      const remaining = categories.length - (columnAmount * 4);
      for(let i = 0; i < 4; i++){ 
        if(remaining > i){
          result.push(categories.splice(0, columnAmount+1));
        }
        else{
          result.push(categories.splice(0, columnAmount));
        }
      }
      
      return result;
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
      return {
        border: `1px solid #ccc`,
        borderRadius: '5px',
        padding: '20px', // Fixed padding
        marginBottom: '20px',
        width: `100%`, // Width calculation based on the number of columns
        boxSizing: 'border-box',
        height: 'min-content',
      };
    },
    getColumnHeights() {
      this.columnHeights = []; // Reset heights
      for (const group of this.groupedCategories) {
        let height = 0;
        for (const category of group) {
          const itemLength = this.filteredItems[category]?.length || 0;
          height += itemLength > 0 ? itemLength * 35 + 74 : 0;
        }
        this.columnHeights.push(height);
      }
      this.addRemainderCategories();
    },
    addRemainderCategories() {
      const minHeight = Math.min(...this.columnHeights);
      const shortestColumnIndex = this.columnHeights.indexOf(minHeight);

      const remainderCategories = this.validCategories.filter(
        category => !this.groupedCategories.flat().includes(category)
      );

      while (remainderCategories.length > 0) {
        this.groupedCategories[shortestColumnIndex].push(remainderCategories.shift());
      }

      this.getColumnHeights(); // Recalculate heights after adding remainder categories
    },
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
      //this.getColumnHeights();
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

.category {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  width: 20%; /* Adjust width as needed */
  box-sizing: border-box;
}

.categories-container {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap; /* Allow categories to wrap */
}

.categories-grid {
  width: 100%;
  justify-content: space-between;
}

.category-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.menu-item {
  margin-top: 10px;
  font-size: 15px;
}

.category-column {
  flex: 1;
  margin-right: 10px;
  margin-left: 10px;
  height: min-height;
  flex-direction: row;
}
</style>