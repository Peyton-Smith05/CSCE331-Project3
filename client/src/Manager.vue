<template>
    <main>
        <TopRibbonTab/>
        <nav class="top-ribbon-overlay">
            <button v-if="showInventory" @click="changeState()" class="see-inventory-btn"> See Inventory</button>
            <button v-if="showSales" @click="changeState()" class="see-sales-btn"> See Sales</button>
        </nav>
        <div class="manager-inner">
            <InventoryTable v-if="showSales"/>
            <SalesChart v-if="showInventory"/>
        </div>
    </main>
</template>

<script>
    import InventoryTable from './components/InventoryTable.vue';
    import SalesChart from './components/SalesChart.vue';
    import TopRibbonTab from './TopRibbonTab.vue';

    export default {
        data() {    
            return {
                showInventory: false,
                showSales: true
            }
        },
        components: {
            TopRibbonTab,
            InventoryTable,
            SalesChart,
        },
        methods: {
            changeState() {
                this.showInventory = !this.showInventory;
                this.showSales = !this.showSales;
            }
        }
    }

</script>

<style>

.top-ribbon-overlay {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px;
}

.top-ribbon-overlay button {
    z-index: 99;
    position: relative;
    left: 7vw;
    background-color: #ff0000;
    color: #fff;
    border: none;
    padding: 10px 20px;
    margin: 10px;
    cursor: pointer;
}

.manager-inner {
        position: absolute;
        display: flex;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        color: black;
        background-color: rgb(255, 236, 220)
    }

</style>