<template>
    <h3 class="title">Menu</h3>
    <div class="menu-wrapper">
        <table>
            <thead></thead>
            <tr>
                <th id="white-menu-header" style="font-weight: bolder;">ID no.</th>
                <th id="#gray-menu-header" style="font-weight: bolder;">Name</th>
                <th id="white-menu-header" style="font-weight: bolder;">Quantity</th>
            </tr>
            <tbody>
                <tr v-for="(menuItem, index) in menuItems" :key="menuItem.id">
                  <template v-if="!menuItem.name.endsWith('_L')">
                    <td id="white-menu-header">
                          <template v-if="menuItem.name.endsWith('_M')">
                              {{ menuItem.name.slice(0, -2) }}
                          </template>
                          <template v-else-if= "menuItem.name.endsWith('_L')">
                          </template>
                          <template v-else>
                            {{ menuItem.name}} 
                          </template>
                      </td>
                      <td id="gray-menu-header">{{ menuItem.category }}</td>
                      <td id="white-menu-header">
                          <template v-if="menuItem.name.endsWith('_M')">
                              {{ menuItem.price }}{{ index < menuItems.length - 1 ? ' | ' + menuItems[index + 1].price : '' }}
                          </template>
                          <template v-else>
                              {{ menuItem.price }}
                          </template>
                    </td>
                  </template>
                </tr>
            </tbody>
        </table>
    </div>
    <button @click="addItem()" class="add-btn">Add Menu Item</button>
    <button @click="delItem()" class="add-btn">Delete Menu Item</button>
  </template>
  
  <script>
  import axios from 'axios';

  const apiRedirect = (window.location.href.slice(0,17) == "http://localhost:") ? "http://localhost:3000" : "";
  
  export default {
    data() {
      return {
        menuItems: [],
      };
    },
    created() {
      this.getMenuData();
    },
    methods: {
      async getMenuData() {
        const menu_request = apiRedirect + "/menu-items";
        try {
          const response = await axios.get(menu_request);
          this.menuItems = response.data;
        } catch (err) {
          console.error(err);
          this.err = 'Failed to load menu items.';
        }
      },
      addItem() {
        // Emit an event to the parent component
        this.$emit('add-menu-popup');
      },
      delItem() {
        // Emit an event to the parent component
        this.$emit('del-menu-popup');
      },
    },
    computed: {
        menuItemsWithNext() {
        // Pair each item with its subsequent item in the list
        return this.menuItems.map((item, index) => {
            if (index < this.menuItems.length - 1) {
            return {
                ...item,
                nextPrice: this.menuItems[index + 1].price,
            };
            }
            // For the last item, set nextPrice as null or any default value
            return {
            ...item,
            nextPrice: null,
            };
        });
    },
  },
  };
  </script>
  
  <style scoped>
  /* Add your styling for the menu table here */
  .menu-wrapper {
    position: relative;
        background: #ccc;
        border: 20px solid #cccc;
        top: 15vh;
        left: 10vw;
        max-height: 35vh;
        max-width: 35vw;
        overflow-y: scroll;
  }

  .title{
    top:15vh;
  }

  .add-btn {
        z-index: 99;
        position: relative;
        left: 18vw;
        top: 15vh;
        background-color: #ff0000;
        color: #fff;
        border: none;
        padding: 10px 20px;
        margin: 10px;
        cursor: pointer;
    }

  #inventory-id, #inventory-quantity, #white-menu-header {
        width: 35%;
        padding: 5px;
        background: rgb(238, 237, 237);
    }

    #inventory-name, #gray-menu-header {
        width: 30%;
        padding: 5px;
        background: lightgray;
    }
  </style>
  