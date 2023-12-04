<template>
    <InventoryPopup v-if="showInventoryRequest" :closePopup=" () => onInventoryClose()">
        <h2 style="font-weight: bolder;">Request a new Inventory</h2>
        <div class="inv-name-input" style="display: flex;">
            <label>Item Name:</label>
            <input type="text" placeholder="straws">
        </div>
        <div class="inv-qty-input" style="display: flex;">
            <label>Quantity:</label>
            <input type="text" placeholder="1">
        </div>
    </InventoryPopup>
    <InventoryPopup v-if="showEmployeeAdd" :closePopup=" () => onEmployeeClose()">
        <h2 style="font-weight: bolder;">Add a New Employee!</h2>
        <div class="inv-name-input" style="display: flex;">
            <label>Full Name:</label>
            <input type="text" placeholder="Paul Taele">
        </div>
        <div class="inv-qty-input" style="display: flex;">
            <label>Employee Title:</label>
            <input type="text" placeholder="Cashier">
        </div>
        <div class="inv-qty-input" style="display: flex;">
            <label>Employee Email</label>
            <input type="text" placeholder="name@example.com">
        </div>
    </InventoryPopup>

    <div class="left-wrapper">
            <h3>Inventory</h3>
            <div class="inventory-wrap">
                <table class="inventory-table">
                    <tr class="inv-header">
                        <th id="inv-id-header" style="font-weight: bolder;">ID no.</th>
                        <th id="inv-name-header" style="font-weight: bolder;">Name</th>
                        <th id="inv-quantity-header" style="font-weight: bolder;">Quantity</th>
                    </tr>
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
                    <tr class="req-header">
                        <th id="req-id-header" style="font-weight: bolder;">Req. id.</th>
                        <th id="req-name-header" style="font-weight: bolder;">Item name</th>
                        <th id="req-qty-header" style="font-weight: bolder;">Quantity</th>
                    </tr>
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
                <button @click="onInventoryOpen()" class="add-btn">Add Request</button>
            </div>
            <h3 id="employee-table-title">Employees</h3>
            <div class="employee-wrapper">
                <table class="employee-table">
                    <tr class="emp-header">
                        <th id="emp-name-header" style="font-weight: bolder;"> Full Name</th>
                        <th id="emp-title-header" style="font-weight: bolder;"> Title </th>
                        <th id="emp-email-header" style="font-weight: bolder;">Email</th>
                    </tr>
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
                <button @click="onEmployeeOpen()" class="add-btn">Add Employee</button>
            </div>
        </div>
</template>

<script>
    // Importing Popups
    import InventoryPopup from "./InventoryPopup.vue"

    import axios from 'axios';

    const apiRedirect = (window.location.href.slice(0,17) == "http://localhost:") ? "http://localhost:3000" : "";
    export default {
        components: {
            InventoryPopup,
        },
        data() {
            return {
                inventoryResponse: [],
                invRequestsResponse: [],
                employeeRespone: [],

                showInventoryRequest: false,
                showEmployeeAdd: false,
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

            onInventoryOpen() { this.showInventoryRequest = !this.showInventoryRequest },
            
            onInventoryClose() {
                this.showInventoryRequest = !this.showInventoryRequest
            },

            onEmployeeOpen() { this.showEmployeeAdd = !this.showEmployeeAdd },

            onEmployeeClose() {
                this.showEmployeeAdd = !this.showEmployeeAdd
            }

        },
    }
</script>

<style lang="scss">
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
        max-width: 50vw;
        overflow-y: auto;
    }

    #inventory-id, #inventory-quantity, #inv-id-header, #inv-quantity-header {
        width: 35%;
        padding: 5px;
        background: rgb(238, 237, 237);
    }
    
    #inventory-name, #inv-name-header {
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
        max-width: 30vw;
        overflow-y: auto;
    }

    #request-id, #request-quantity, #req-id-header, #req-qty-header {
        width: 35%;
        padding: 5px;
        background: rgb(238, 237, 237);
    }
    
    #request-item-name, #req-name-header {
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
    
    #employee-name, #employee-email, #emp-name-header, #emp-email-header {
        width: 35%;
        padding: 5px;
        background: rgb(238, 237, 237);
    }

    #employee-title, #emp-title-header {
        width:30%;
        padding: 5px;
        background: lightgray;
    }

    .add-btn {
        z-index: 99;
        position: relative;
        left: -1vw;
        background-color: #ff0000;
        color: #fff;
        border: none;
        padding: 10px 20px;
        margin: 10px;
        cursor: pointer;
    }

    .inv-name-input, .inv-qty-input {
        padding: 10px;
    }

    .inv-name-input label, .inv-qty-input label {
        width:180px;
        clear:left;
        text-align:left;
        padding-right:10px;
    }

</style>