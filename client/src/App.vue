
<template>
  <div id="app" class="container" :class="{darkmode: dark == 'no'}">
    <TopRibbonTab /><!-- Include the TopRibbonTab component -->
    <!-- Carousel component for new drinks and deals -->
    <!-- <Menu /> -->
    <router-view>

    </router-view>
  </div>

</template>

<script>
import TopRibbonTab from './TopRibbonTab.vue';
import Menu from './components/Menu.vue';

export default {
  el: 'app',
  data() {
    return {
      dark: 'no'
    }
  },
  components: {
    TopRibbonTab,
    Menu
  },
};
</script>
