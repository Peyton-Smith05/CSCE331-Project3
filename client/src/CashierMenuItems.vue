<template>
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
      this.$router.push({ name: 'CashierToppings', params: { } });
    },
  },
};
</script>

<style scoped>

.menu-items {
    padding: 20px 0; 
  }

  .menu-items-wrapper {
    flex: 1;
    padding: 0 20px; 
    border-left: 1px solid #ccc; 
    border-right: 1px solid #ccc; 
    overflow-y: auto; 
  }


</style>