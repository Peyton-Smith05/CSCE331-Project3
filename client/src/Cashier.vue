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
    <div class="menu-items-wrapper">
      <div class="menu-items">
        <h3>Menu Items</h3>
        <ul>
          <li v-for="menuItem in removeDuplicates(filteredMenuItems)" :key="menuItem.id">
            <div>
              {{ menuItem.name }} - ${{ menuItem.price }}
              <button @click="addItemToOrder(menuItem)">Add to Order</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="ordered-items-wrapper">
      <div class="ordered-items">
        <h3>Ordered Items</h3>
        <div class="total">
          Items: ${{ itemCost }}<br>
          Tax: ${{ parseFloat(taxCost).toFixed(2) }}<br>
          Total: ${{ parseFloat(totalCost).toFixed(2) }}
          <form @submit.prevent="submitOrderLog(orderData)">
            <button type="submit">Checkout</button>
          </form>
        </div>
        <ul>
          <li v-for="orderItem in orderedItems" :key="orderItem.temp">
            <div>
              name: {{ orderItem.name }} <br>
              quantity: {{ orderItem.quantity }} <br>
              price: ${{ orderItem.price }} <br>
              size: {{ orderItem.custom.size }} <br>
              temp: {{ orderItem.custom.temp }} <br>
              ice_level: {{ orderItem.custom.ice_level }} <br>
              sugar_level: {{ orderItem.custom.sugar_level }} <br>
              toppings: {{ orderItem.custom.toppings }} <br>
              <button @click="removeItemFromOrder(orderItem)">Remove</button>
              <button
                type="button"
                class="btn"
                @click="showModal"
              >
                Modify
              </button>
              <Modal
                v-show="isModalVisible"
                @close="closeModal"
                @updateCustom="updateCustomVal"
                v-bind:id=orderItem.id
                size="hehe"
                temp="hehe"
                ice_level=""
                sugar_level=""
                toppings=""
              />
            </div>
            <!-- <div>
              {{ orderItem.name }} - ${{ orderItem.price }} - Quantity: {{ orderItem.quantity }}
              <button @click="removeItemFromOrder(orderItem)">Remove</button>
            </div> -->
            
          </li>
        </ul>
        
      </div>
    </div>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  import { v4 as uuidv4 } from 'uuid';
  import Modal from './components/Modification.vue'
  const apiRedirect = (window.location.href.slice(0,17) == "http://localhost:") ? "http://localhost:3000" : "";
  console.log(apiRedirect)

  export default {
    components: {
      Modal,
    },
    data() {
      return {
        orderedItems: [],
        filteredMenuItems: [],
        selectedCategory: 0,
        respond: [],
        respondItems: [],
        isModalVisible: false,
        orderData: {
          orderid: '', 
          empid: '',
          date: '',
          time: '',
          total: '',
          tip: '',
        },
      };
    },
    created() {
      const category_api = apiRedirect + "/menu-items/category";
      this.fetchCategory(category_api);
          // Call the second fetchData function or any other operations that depend on categories here
      
      const menuItems_api = apiRedirect + "/menu-items";
      this.fetchMenuItems(menuItems_api); // Replace with the appropriate URL
    },
    methods: {
      async fetchCategory(whatToFetch) {
        try {
          const response = await axios.get(whatToFetch);
          this.respond = response.data;
        } catch (error) {
          console.error(error);
          this.error = 'Failed to load users.';
        }
      },
      async fetchMenuItems(whatToFetch) {
          try {
            const response = await axios.get(whatToFetch);
            this.respondItems = response.data;
          } catch (error) {
            console.error(error);
            this.error = 'Failed to load users.';
          }
      },
      addItemToOrder(menuItem) {
        //if (menuItem.quantity > 0) {
          const existingItem = this.orderedItems.find(
            (item) => item.id === menuItem.id
          );

          if (existingItem !== undefined) {
            existingItem.quantity++;
            console.log("Selection passes on true side!");
          } else {
            this.orderedItems.push({ ...menuItem, quantity: 1 });
            console.log("Selection passes on false side!");
          }
        //} else {
        //  alert("Item quantity must be greater than 0");
        //}
      },
      removeItemFromOrder(orderItem) {
        const indexToRemove = this.orderedItems.findIndex(item => item.id === orderItem.id);
        if (indexToRemove !== -1) {
          if (orderItem.quantity > 1) {
            this.orderedItems[indexToRemove].quantity--;
          } else {
            this.orderedItems.splice(indexToRemove, 1);
          }
        }
      },
      filterByCategory(categoryId) {
        this.selectedCategory = categoryId
        if (categoryId === 0) {
          this.filteredMenuItems = this.menuItems;
        } else {
          this.filteredMenuItems = this.menuItems.filter(
            (item) => item.category === categoryId
          )
        }
      },
      removeDuplicates(menuItems) {
        let noDupMenu = [];
        let UniqueItems = {};
        for(let index in menuItems) {
          let itemName = menuItems[index]['name'];
          UniqueItems[itemName] = menuItems[index];
        }
        
        for( let noDupItem in UniqueItems) {
          noDupMenu.push(UniqueItems[noDupItem]);
        }
        return noDupMenu
      },
      cleanItemName(item_name) {
        if(item_name[item_name.length - 1] == 'M' || item_name[item_name.length - 1] == 'L') {
          item_name = item_name.substring(0, item_name.length - 2)
        }
        return item_name;
      },
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
      updateCustomVal(id, size, temp, ice_level, sugar_level, toppings) {
        console.log("HHEHHEHEHHEHEHEHHEHEHEH")
        const indexToUpdate = this.orderedItems.findIndex(item => item.id === id)
        this.orderedItems[indexToUpdate].size = size
        this.orderedItems[indexToUpdate].temp = temp
        this.orderedItems[indexToUpdate].ice_level = ice_level
        this.orderedItems[indexToUpdate].sugar_level = sugar_level
        this.orderedItems[indexToUpdate].toppings = toppings
        console.log(this.orderedItems)
      },
      async submitOrderLog(orderDetails) {
        const now = new Date();
        const isoNow = now.toISOString();

        orderDetails.orderid = 1000100;
        orderDetails.empid = 4;
        orderDetails.time = isoNow.split('T')[1].split('.')[0];
        orderDetails.date = isoNow.split('T')[0];
        orderDetails.total = this.totalCost;
        orderDetails.tip = 0.0;
        try {
         
          const response = await axios.post('http://localhost:3000/api/order', orderDetails);
          console.log(response.data);
        } catch (error) {
          console.error('Error:', error); 
        }
      },
    },
    computed: {
      itemCost() {
        return this.orderedItems.reduce((acc, item) => {
          return acc + item.price * item.quantity;
        }, 0);
      },
      categories() {
        return this.respond.filter(category => category.category !== "topping").map((category, index) => ({
          id: index + 1,
          name: category.category,
        }));
      },
      menuItems() {
        return this.respondItems.filter(item => item.category !== "topping").map((item, index) => {
        const matchingCategory = this.categories.find(category => category.name === item.category);
        const categoryId = matchingCategory ? matchingCategory.id : 0; // Default to 0 if no matching category is found
        return {
          id: index + 1,
          name: this.cleanItemName(item.name),
          price: item.price,
          category: categoryId,
          quantity: 1,
          custom: {
            size: 'medium',
            temp: 'cold',
            ice_level: 'regular',
            sugar_level: 100,
            toppings: [
              {topping_name: 'Bubble',
               topping_quantity: 1,
               topping_price: 0.5
              }
            ]
          },
        };
      });
      },
      taxCost() {
        return this.orderedItems.reduce((acc, item) => {
          return (acc + item.price * item.quantity) * 0.07;
        }, 0);
      },
      totalCost() {
        return this.orderedItems.reduce((acc, item) => {
          return (acc + item.price * item.quantity) * 1.07;
        }, 0);
      }
    },
    mounted() {
      this.filteredMenuItems = this.menuItems;
      axios.get(apiRedirect+ '/menu-items')
        .then((response) => {
          this.menuItems = response.data;
          this.filteredMenuItems = this.menuItems;
        })
        .catch((error) => {
          console.error('error fetching menu items:', error);
        })
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
    padding: 20px 0; 
  }

  .ordered-items {
    position: relative;
  }
  
  .total {
    position: absolute;
    top: 10;
    right: 0;
    text-align: right;
    font-weight: bold;
  }

  .menu-items-wrapper {
    flex: 1;
    padding: 0 20px; 
    border-left: 1px solid #ccc; 
    border-right: 1px solid #ccc; 
    overflow-y: auto; 
  }

  .ordered-items-wrapper {
    flex: 1;
    padding: 0 20px;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  .menu-items-wrapper {
    margin-right: 10px; 
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
