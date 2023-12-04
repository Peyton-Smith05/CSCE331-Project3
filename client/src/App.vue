
<template>
  <div>
    <TopRibbonTab/><!-- Include the TopRibbonTab component -->
    <!-- Carousel component for new drinks and deals -->
    <!-- <Menu /> -->
    <router-view>

    </router-view>
  </div>

</template>

<script>
import TopRibbonTab from './TopRibbonTab.vue';

export default {
  components: {
    TopRibbonTab,
  },
};
</script>
