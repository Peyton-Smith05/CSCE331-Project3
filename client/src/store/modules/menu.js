import axios from 'axios';

const apiRedirect = (window.location.href.slice(0, 17) == "http://localhost:") ? "http://localhost:3000" : "";


export default {
    namespaced: true,
    state: () => ({
      categories: [],
      menuItems: [],
      selectedCategory: 0,
    }),
    mutations: {
      // Menu mutations
      setCategories(state, categories) {
        state.categories = categories;
      },
      setMenuItems(state, menuItems) {
        state.menuItems = menuItems;
      },
      setSelectedCategory(state, categoryId) {
        state.selectedCategory = categoryId;
      },
    },
    actions: {
      // Menu actions
      async fetchMenuData({ commit }) {
        try {

          const category_api = apiRedirect + "/menu-items/category";
          const menuItems_api = apiRedirect + "/menu-items";
          
          const categoriesResponse = await axios.get(category_api);
          commit('setCategories', categoriesResponse.data);
          
          const menuItemsResponse = await axios.get(menuItems_api);
          commit('setMenuItems', menuItemsResponse.data);
        } catch (error) {
          console.error('Error fetching menu data:', error);
        }
      },
      changeSelectedCategory({ commit }, categoryId) {
        commit('setSelectedCategory', categoryId);
      },
    },
    getters: {
      // Menu getters
      itemsByCategory(state) {
        return state.menuItems.filter(item => item.categoryId === state.selectedCategory);
      },
      allCategories(state) {
        return state.categories;
      },
      selectedCategory(state) {
        return state.selectedCategory;
      }
    }
  };
  