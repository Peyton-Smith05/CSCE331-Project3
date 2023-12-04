<template>
    <div class="inv-popup">
        <div class="inv-inner">
            <slot />
            <button class="popup-close" @click="closePopup()"> Add </button>
        </div>
    </div>
</template>
    
<script>
    export default {
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