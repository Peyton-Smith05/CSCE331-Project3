<template>
    <div class="manager-inner">
        <div class="left-wrapper">
            <h3>Inventory</h3>
            <div class="inventory-wrap">
                <table class="inventory-table">
                    <tr class="inventory-element" v-for="inventoryItem in inventoryResponse" 
                    :key="inventoryItem.inventoryid">
                        <th id="inventory-id">
                            {{ inventoryItem.inventoryid }}
                        </th>
                        <th id="inventory-name">
                            {{ inventoryItem.name }}
                        </th>
                        <th id="inventory-quantity">
                            {{ inventoryItem.quantity }}
                        </th>
                    </tr>
                </table>
            </div>
        </div>
        <div class="right-wrapper">
            <h3 id="request-title">Inventory Requests</h3>
            <div class="requests-wrapper">
                <table class="inventory-requests-table">
                    <tr class="request-element" v-for="requestItem in invRequestsResponse" :key="requestItem.request_id">
                        <th id="request-id">
                            {{ requestItem.request_id }}
                        </th>
                        <th id="request-item-name">
                            {{ requestItem.item_name }}
                        </th>
                        <th id="request-quantity">
                            {{ requestItem.quantity }}
                        </th>
                    </tr>
                </table>
            </div>
            <h3 id="employee-table-title">Employees</h3>
            <div class="employee-wrapper">
                <table class="employee-table">
                    <tr class="employee-element" v-for="employeeItem in employeeRespone" :key="employeeItem.empid">
                        <th id="employee-name">
                            {{ employeeItem.fname }} {{ employeeItem.lname }}
                        </th>
                        <th id="employee-title">
                            {{ employeeItem.title }}
                        </th>
                        <th id="employee-email">
                            {{ employeeItem.email }}
                        </th>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    const apiRedirect = (window.location.href.slice(0,17) == "http://localhost:") ? "http://localhost:3000" : "";
    export default {
        data() {
            return {
                inventoryResponse: [],
                invRequestsResponse: [],
                employeeRespone: [],
            }
        },
        created() {
            this.getInventoryData();
            this.getInvRequestData();
            this.getEmployeeData();
        },  
        methods: {
            async getInventoryData() {
                const inventory_request = apiRedirect + "/manager/inventory";
                try {
                    const response = await axios.get(inventory_request);
                    this.inventoryResponse = response.data;
                } catch(err) {
                    console.error(err);
                    this.err = 'Failed to load inventory.';
                }
            },
            async getInvRequestData() {
                const invRequest_request = apiRedirect + "/manager/inventory_requests";
                try {
                    const response = await axios.get(invRequest_request);
                    this.invRequestsResponse = response.data;
                } catch(err) {
                    console.error(err);
                    this.err = 'Failed to load inventory requests';
                }
            },
            async getEmployeeData() {
                const employee_request = apiRedirect + "/manager/employee";
                try {
                    const response = await axios.get(employee_request);
                    this.employeeRespone = response.data;
                    console.log(this.employeeRespone)
                } catch(err) {
                    console.error(err);
                    this.err = 'Failed to load employees';
                }
            },
        },
    }
</script>

<style lang="scss">
    .manager-inner {
        position: absolute;
        display: flex;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100;
        height: 100;
    }
    
    .left-wrapper {
        width: 40vw;
    }
    
    .left-wrapper h3 {
        top: 20vh;
        left: 10vw;
        position: relative;
        font-size: larger;
        font-weight: bolder;
    }

    .inventory-wrap {
        position: relative;
        top: 20vh;
        left: 10vw;
        max-height: 65vh;
        overflow-y: auto;
    }

    #inventory-id, #inventory-quantity {
        width: 35%;
        padding: 5px;
        background: rgb(238, 237, 237);
    }
    
    #inventory-name {
        width: 30%;
        padding: 5px;
        background: lightgray;
    }

    .right-wrapper {
        width: 60vw;
    }

    #request-title {
        position: relative;
        top: 20vh;
        left: 20vw;
        font-size: larger;
        font-weight: bolder;
    }

    .requests-wrapper {
        position: relative;
        top: 20vh;
        left: 20vw;
        max-height: 30vh;
        overflow-y: auto;
    }

    #request-id, #request-quantity {
        width: 35%;
        padding: 5px;
        background: rgb(238, 237, 237);
    }
    
    #request-item-name {
        width: 30%;
        padding: 5px;
        background: lightgray;
    }
    
    #employee-table-title {
        position: relative;
        top: 40vh;
        left: 20vw;
        font-size:larger;
        font-weight: bolder;
    }
    
    .employee-wrapper {
        position: relative;
        top: 40vh;
        left: 20vw;
        max-height: 30vh;
        overflow-y: auto;
    }
    
    #employee-name, #employee-email {
        width: 35%;
        padding: 5px;
        background: rgb(238, 237, 237);
    }

    #employee-title {
        width:30%;
        padding: 5px;
        background: lightgray;
    }



</style>