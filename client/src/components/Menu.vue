<template>
  <LandingHeader/>
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
          <h2 :style="{ fontSize: titleFontMod }" class="category-title">{{ capitalize(category) }}</h2>
            <div
              v-if="filteredItems[category]"
              v-for="(item, itemIndex) in filteredItems[category]"
              :key="itemIndex"
              class="menu-item" :style="style={ fontSize: itemFontMod }"
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
import { ref, computed, onMounted, inject } from 'vue';
import axios from 'axios';
import LandingHeader from './LandingHeader.vue';

const apiRedirect = "http://localhost:3000";

export default {
    setup() {
      const globalData = inject('globalTextMod');
      const categories = ref([]);
      const menuItems = ref({});
      const columns = 4;
      const columnHeights = ref([]);
      const validCategories = computed(() => categories.value.filter(category => category !== "what's new" && category !== "merchandise"));
      const groupedCategories = computed(() => {
          const result = [];
          const cats = [...validCategories.value];
          const columnAmount = Math.floor(cats.length / columns);
          const remaining = cats.length - (columnAmount * columns);
          for (let i = 0; i < columns; i++) {
              if (remaining > i) {
                  result.push(cats.splice(0, columnAmount + 1));
              }
              else {
                  result.push(cats.splice(0, columnAmount));
              }
          }
          return result;
      });

      const titleFontMod = computed(() => {
        const textSize = 24;
        return `${textSize * globalData.textMod}px`;
      });

      const itemFontMod = computed(() => {
        const textSize = 15;
        return `${textSize * globalData.textMod}px`;
      });

      const filteredItems = computed(() => {
            const filtered = {};
            for (const category in menuItems.value) {
                filtered[category] = menuItems.value[category].filter(item => !item.name.endsWith('_L'));
            }
            return filtered;
        });
        function removeSubstring(str, substr) {
            return str.replace(substr, '');
        }
        function capitalize(str) {
            return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }
        function getCategoryStyles(category) {
            return {
                border: `1px solid #ccc`,
                borderRadius: '5px',
                padding: '20px',
                marginBottom: '20px',
                width: `100%`,
                boxSizing: 'border-box',
                height: 'min-content',
            };
        }
        function getColumnHeights() {
            columnHeights.value = [];
            for (const group of groupedCategories.value) {
                let height = 0;
                for (const category of group) {
                    const itemLength = filteredItems.value[category]?.length || 0;
                    height += itemLength > 0 ? itemLength * 35 + 74 : 0;
                }
                columnHeights.value.push(height);
            }
            addRemainderCategories();
        }
        function addRemainderCategories() {
            const minHeight = Math.min(...columnHeights.value);
            const shortestColumnIndex = columnHeights.value.indexOf(minHeight);
            const remainderCategories = validCategories.value.filter(category => !groupedCategories.value.flat().includes(category));
            while (remainderCategories.length > 0) {
                groupedCategories.value[shortestColumnIndex].push(remainderCategories.shift());
            }
            getColumnHeights();
        }
        onMounted(async () => {
            try {
                const categoriesResponse = await axios.get(apiRedirect + '/menu-items/category');
                categories.value = categoriesResponse.data.map(category => category.category);
                for (const category of categories.value) {
                    if (category !== "what's new" && category !== "merchandise") {
                        const fixedCategory = category.toLowerCase().replace(' ', '-');
                        const itemsResponse = await axios.get(apiRedirect + `/menu-items/${fixedCategory}`);
                        menuItems.value[category] = itemsResponse.data;
                    }
                }
            }
            catch (error) {
                console.error(error);
            }
        });
        return {
            categories,
            menuItems,
            columns,
            columnHeights,
            validCategories,
            groupedCategories,
            filteredItems,
            removeSubstring,
            capitalize,
            getCategoryStyles,
            getColumnHeights,
            addRemainderCategories,
            titleFontMod,
            itemFontMod,
        };
    },
    components: { LandingHeader }
};
</script>

<style scoped>
.menu {
  width: 95vw; /* Set a maximum width for the menu */
  height: 80vh;
  padding-top: 10%;
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