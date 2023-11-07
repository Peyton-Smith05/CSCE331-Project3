
<template>
  <div>
    <TopRibbonTab /><!-- Include the TopRibbonTab component -->
    <!-- Carousel component for new drinks and deals -->
    <Carousel :items="carouselItems" />
  </div>

</template>

<script>
import TopRibbonTab from './TopRibbonTab.vue'; // Import the TopRibbonTab component
import Carousel from './Carousel.vue'; // Import the Carousel component

export default {
  components: {
    TopRibbonTab,
    Carousel,
  },
  data() {
    return {
      // Define the carousel items (new drinks and deals)
      carouselItems: [
        { title: "New Drink 1", description: "Try our latest drink!"},
        { title: "Deal 1", description: "Special deal for you!"},
        // Add more items as needed
      ],
    };
  },
};
</script>
