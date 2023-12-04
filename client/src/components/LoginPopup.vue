<template>
    <div class="error-popup">
        <div class="popup-inner">
            <slot />
            <button class="popup-close" @click="closePopup()"> Close Popup </button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['closePopup']
}
</script>

<style lang="scss" scoped>
.error-popup {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    .popup-inner {
        background: white;
        padding: 32px;
    }
    .popup-inner button {
        position: relative;
        left: 40%;
    }
}

</style>