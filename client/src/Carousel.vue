<template>
  <div class="carousel">
    <button @click="prevItem" class="arrow left-arrow">&lt;</button>
    <div v-for="(item, index) in carouselItems" :key="index" class="carousel-item" :class="{ active: index === currentIndex }">
      <div class="item-details">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </div>
    </div>
    <button @click="nextItem" class="arrow right-arrow">&gt;</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      carouselItems: [
        { title: "New Drink 1", description: "Try our latest drink!" },
        { title: "Deal 1", description: "Special deal for you!" },
        // Add more items as needed
      ],
    };
  },
  methods: {
    nextItem() {
      this.currentIndex = (this.currentIndex + 1) % this.carouselItems.length;
    }, 
    prevItem() {
      this.currentIndex = (this.currentIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
    },
  },
};
</script>
  
  
  <style scoped>
  /* CSS reset to remove default margin and padding */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Your existing styles */
  .carousel {
    display: flex;
    overflow: hidden;
    height: 90vh;
    top: 10vh;
    left: 0;
    width: 100vw;
    align-items: center; /* Center items vertically */
  }

  .carousel-item {
    margin: 0 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
    display: none;
    flex: 0 0 30%; /* Set a fixed width for the items (adjust as needed) */
    height: 200px; /* Set a fixed height for the items (adjust as needed) */
    overflow: hidden; /* Hide overflow content */
    display: flex; /* Use flexbox for centering */
    flex-direction: column; /* Stack items vertically */
    justify-content: center; /* Center items vertically */
    align-items: center; /* Center items horizontally */
  }

  .carousel-item.active {
    display: block;
  }

  .arrow {
    top: 50%;
    background-color: #007bff;
    color: #fff;
    border: none;
    height: 45px;
    padding: 10px 15px;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    z-index: 2;
    position: absolute; /* Position arrows absolutely */
  }

  .left-arrow {
    left: 10px;
  }

  .right-arrow {
    right: 10px;
  }
</style>

