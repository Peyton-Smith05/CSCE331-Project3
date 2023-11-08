
<template>
  <div>
    <TopRibbonTab /><!-- Include the TopRibbonTab component -->
    <!-- Carousel component for new drinks and deals -->

    <router-view>

    </router-view>
  </div>

</template>

<script>
import TopRibbonTab from './TopRibbonTab.vue'; // Import the TopRibbonTab component

export default {
  components: {
    TopRibbonTab
  },
};
</script>
