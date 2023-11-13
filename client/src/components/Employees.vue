<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item.orderid">
        {{ item.orderid }} : {{ item.date }} - {{ item.total }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      items: [] // This will hold the data we receive
    };
  },
  async created() {
    try {
      const response = await axios.get('/api/data'); // Adjust the URL as needed
      this.items = response.data;
      console.log(response.data);
    } catch (error) {
      console.error(error);
      // Handle the error, e.g., show a notification to the user
    }
  }
};
</script>
