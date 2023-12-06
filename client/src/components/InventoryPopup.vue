<template>
    <!-- @vuese
    This template defines a popup layout with a slot for content insertion and a confirm button. The slot allows for dynamic content to be inserted into the popup. -->
    <div class="inv-popup">
      <div class="inv-inner">
        <!-- Slot for inserting dynamic content -->
        <slot />
        <!-- Button to confirm and close the popup -->
        <button class="popup-close" @click="closePopup()"> Confirm </button>
      </div>
    </div>
  </template>
    
<script>
    /**
     * @vuese
     * This component is a popup window that can contain dynamic content. It receives a method as a prop to handle the closing action, which is triggered by a confirm button.
     */
    export default {
        /**
         * @vuese
         * A function passed as a prop to handle the action of closing the popup. This function is triggered by the confirm button.
         */
        props: ['closePopup']
    }
</script>

<style lang="scss">
.inv-popup {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    .inv-inner {
        background: white;
        padding: 32px;
    }
    .inv-inner button {
        position: relative;
        left: 40%;
        background-color: #ff0000;
        color: #fff;
        border: none;
        padding: 10px 20px;
        margin: 10px;
        cursor: pointer;
    }
}
</style>