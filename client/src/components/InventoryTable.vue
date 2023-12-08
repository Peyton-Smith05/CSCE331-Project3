<template>
    <InventoryPopup v-if="addInvPopup" :closePopup=" () => handleNewInvReq()">
        <h2 style="font-weight: bolder;">Request a new Inventory</h2>
        <div class="popup-entry" style="display: flex;">
            <label>Item Name:</label>
            <input type="text" v-model="reqItemName" placeholder="straws">
        </div>
        <div class="popup-entry" style="display: flex;">
            <label>Quantity:</label>
            <input type="text" v-model="reqQuantity" placeholder="1">
        </div>
    </InventoryPopup>
    <InventoryPopup v-if="addEmpPopup" :closePopup=" () => handleNewEmp()">
        <h2 style="font-weight: bolder;">Add a New Employee!</h2>
        <div class="popup-entry" style="display: flex;">
            <label>First Name:</label>
            <input type="text" v-model="empFname" placeholder="Paul">
        </div>
        <div class="popup-entry" style="display: flex;">
            <label>Last Name:</label>
            <input type="text" v-model="empLname" placeholder="Taele">
        </div>
        <div class="popup-entry" style="display: flex;">
            <label>Employee Title:</label>
            <input type="text" v-model="empTitle" placeholder="Cashier">
        </div>
        <div class="popup-entry" style="display: flex;">
            <label>Employee Email</label>
            <input type="text" v-model="empEmail" placeholder="name@example.com">
        </div>
        <div class="popup-entry" style="display: flex;">
            <label>Employee Password</label>
            <input type="text" v-model="empPswd" placeholder="1234">
        </div>
    </InventoryPopup>
    <InventoryPopup v-if="delInvPopup" :closePopup=" () => handleDelInvReq()">
        <h2 style="font-weight: bolder;">Delete an Inventory Request</h2>
        <div class="popup-entry" style="display: flex;">
            <label>Request Id.</label>
            <input type="text" v-model="reqId" placeholder="1234">
        </div>
    </InventoryPopup>
    <InventoryPopup v-if="delEmpPopup" :closePopup=" () => handleDelEmp()">
        <h2 style="font-weight: bolder;">Delete an Employee</h2>
        <div class="popup-entry" style="display: flex;">
            <label>Employee Id.</label>
            <input type="text" v-model="empId" placeholder="1234">
        </div>
    </InventoryPopup>
    <InventoryPopup v-if="addMenuPopUp" :closePopup=" () => handleaddMenu()">
        <h2 style="font-weight: bolder;">Add a menu Item</h2>
        <div class="popup-entry" style="display: flex;">
            <label>Item Name:</label>
            <input type="text" v-model="menuName" placeholder="Green Tea">
        </div>
        <div class="popup-entry" style="display: flex;">
            <label>Category:</label>
            <input type="text" v-model="menuCategory" placeholder="Classic">
        </div>
        <div class="popup-entry" style="display: flex;">
            <label>Price:</label>
            <input type="text" v-model="menuPrice" placeholder="1.0">
        </div>
        <div class="popup-entry" style="display: flex;">
            <label>Large Price:</label>
            <input type="text" v-model="menuLPrice" placeholder="1.5">
        </div>
    </InventoryPopup>
    <InventoryPopup v-if="delMenuPopUp" :closePopup=" () => handledelMenu()">
        <h2 style="font-weight: bolder;">Delete a Menu Item</h2>
        <div class="popup-entry" style="display: flex;">
            <label>Item Name:</label>
            <input type="text" v-model="menuName" placeholder="Green Tea">
        </div>
        <div class="popup-entry" style="display: flex;">
            <label>Drink? (Y/N):</label>
            <input type="text" v-model="menuCategory" placeholder="Y">
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
            <MenuTable @add-menu-popup="openAddMenuPopup" @del-menu-popup="openDelMenuPopup" />
        </div>
        <div class="right-wrapper">
            <h3 id="request-title">Inventory Requests</h3>
            <div class="requests-wrapper">
                <div class="table-wrapper">
                    <table class="inventory-requests-table">
                        <tr class="req-header">
                            <th id="req-id-header" style="font-weight: bolder;">Request Id.</th>
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
                </div>
                <button @click="AddInvRequest()" class="add-btn">Add Request</button>
                <button @click="DeleteInvRequest()" class="add-btn">Delete Request</button>
            </div>
            <h3 id="employee-table-title">Employees</h3>
            <div class="employee-wrapper">
                <div class="table-wrapper">
                    <table class="employee-table">
                        <tr class="emp-header">
                            <th id="emp-id-header" style="font-weight: bolder;"> Employee Id</th>
                            <th id="emp-name-header" style="font-weight: bolder;"> Full Name</th>
                            <th id="emp-title-header" style="font-weight: bolder;"> Title </th>
                            <th id="emp-email-header" style="font-weight: bolder;">Email</th>
                        </tr>
                        <tr class="employee-element" v-for="employeeItem in employeeRespone" :key="employeeItem.empid">
                            <th id="employee-id">
                                {{ employeeItem.empid }}
                            </th>
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
                <button @click="addEmployee()" class="add-btn">Add Employee</button>
                <button @click="delEmployee()" class="add-btn">Delete Employee</button>
            </div>
        </div>
</template>

<script>
    // Importing Popups
    import InventoryPopup from "./InventoryPopup.vue"
    import MenuTable from "./MenuTable.vue";

    import axios from 'axios';

    const apiRedirect = (window.location.href.slice(0,17) == "http://localhost:") ? "http://localhost:3000" : "";
    export default {
        components: {
            InventoryPopup,
            MenuTable,
        },
        data() {
            return {
                inventoryResponse: [],
                invRequestsResponse: [],
                employeeRespone: [],

                addInvPopup: false,
                delInvPopup: false,
                addEmpPopup: false,
                delEmpPopup: false,
                addMenuPopUp: false,
                delMenuPopUp: false,

                // Placeholder variables for employees
                empId: '',
                empFname: '',
                empLname: '',
                empTitle: '',
                empEmail: '',
                empPswd: '',
                employeeTemplate: {
                    empid: 0,
                    fname: '',
                    lname: '',
                    title: '',
                    email: '',
                    password: '',
                },

                // Placeholder variables for inventory request.
                reqItemName: '',
                reqQuantity: '',
                reqId: '',
                invRequestTemplate: {
                    item_name: '',
                    quantity: 0,
                    request_id: 0,
                },

                menuName: '',
                menuPrice: 0.0,
                menuLPrice: 0.0,
                menuCategory: '',
                menuTemplate: {
                    name: '',
                    price: 0.0,
                    lprice: 0.0,
                    category: '',
                }
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
            openAddMenuPopup() {
            // Set the addMenuPopUp variable to true when Add Employee is clicked in Menu.vue
                this.addMenuPopUp = true;
            },
            openDelMenuPopup() {
            // Set the addMenuPopUp variable to true when Add Employee is clicked in Menu.vue
                this.delMenuPopUp = true;
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
                } catch(err) {
                    console.error(err);
                    this.err = 'Failed to load employees';
                }
            },

            AddInvRequest() { this.addInvPopup = !this.addInvPopup },
            DeleteInvRequest() {this.delInvPopup = !this.delInvPopup},

            async handleNewInvReq() {
                const requestPostAPI = apiRedirect + "/manager/api/new-request"
                try {
                    // Creating data for API POST request.
                    this.invRequestTemplate.item_name = this.reqItemName;
                    this.invRequestTemplate.quantity = this.reqQuantity;
                    const response = await axios.post(requestPostAPI, this.invRequestTemplate);
                    
                    
                } catch(err) {
                    console.error(err);
                    err = "Could not insert new employee.";
                }
                this.addInvPopup = !this.addInvPopup
            },

            async handleDelInvReq() {
                const deletePostQuery = apiRedirect + "/manager/api/delete-request";
                try {
                    // Creating data for API POST request
                    this.invRequestTemplate.request_id = this.reqId;
                    const response = await axios.post(deletePostQuery, this.invRequestTemplate)

                } catch(err) {
                    console.error(err);
                    err = "Could not insert new employee.";
                }
                this.delInvPopup = !this.delInvPopup;
            },

            addEmployee() { this.addEmpPopup = !this.addEmpPopup },

            delEmployee() { this.delEmpPopup = !this.delEmpPopup},

            async handleNewEmp() {
                const addEmpAPI = apiRedirect + "/manager/api/new-employee"
                try {
                    // Creating data template to pass API POST request.
                    this.employeeTemplate.fname = this.empFname;
                    this.employeeTemplate.lname = this.empLname;
                    this.employeeTemplate.title = this.empTitle;
                    this.employeeTemplate.email = this.empEmail;
                    this.employeeTemplate.password = this.empPswd;
                    
                    const response = await axios.post(addEmpAPI, this.employeeTemplate);

                } catch(err) {
                    console.error(err);
                    err = "Could not insert new employee.";
                }
                this.addEmpPopup = !this.addEmpPopup
            },

            async handleDelEmp() {
                const delEmpAPI = apiRedirect + "/manager/api/delete-employee";
                try {
                    this.employeeTemplate.empid = this.empId;
                    const response = await axios.post(delEmpAPI, this.employeeTemplate);
                } catch(err) {
                    console.error(err);
                    err = "Could not insert new employee.";
                }
                this.delEmpPopup = !this.delEmpPopup;
            },

            async handleaddMenu() {
                const API = apiRedirect + "/manager/api/add-menu";
                try {
                    this.menuTemplate.name = this.menuName;
                    this.menuTemplate.price = this.menuPrice;
                    this.menuTemplate.lprice = this.menuLPrice;
                    this.menuTemplate.category = this.menuCategory;

                    const response = await axios.post(API, this.menuTemplate);
                } catch(err) {
                    console.error(err);
                    err = "Could not insert new employee.";
                }
                this.addMenuPopUp = false;
            },

            async handledelMenu() {
                const API = apiRedirect + "/manager/api/del-menu";
                try {
                    this.menuTemplate.name = this.menuName;
                    this.menuTemplate.category = this.menuCategory;
                    const response = await axios.post(API, this.menuTemplate);
                } catch(err) {
                    console.error(err);
                    err = "Could not insert new employee.";
                }
                this.delMenuPopUp = false;
            },

        },
    }
</script>

<style lang="scss">
    .left-wrapper {
        width: 40vw;
    }
    
    .left-wrapper h3 {
        top: 12vh;
        left: 10vw;
        position: relative;
        font-size: larger;
        font-weight: bolder;
    }

    .inventory-wrap {
        position: relative;
        background: #ccc;
        border: 20px solid #cccc;
        top: 12vh;
        left: 10vw;
        max-height: 35vh;
        max-width: 35vw;
        overflow-y: scroll;
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
        background: #ccc;
        padding: 10px;
        text-align: center;
        top: 20vh;
        left: 20vw;
        max-height: 30vh;
        max-width: 25vw;
    }
    
    .table-wrapper{
        overflow-y: auto;
    }
    
    #request-id, #request-quantity, #req-id-header, #req-qty-header {
        position: relative;
        left: 25%;
        width: 35%;
        padding: 5px;
        background: rgb(238, 237, 237);
    }
    
    #request-item-name, #req-name-header {
        position: relative;
        left: 25%;
        width: 30%;
        padding: 5px;
        background: lightgray;
    }
    
    #employee-table-title {
        position: relative;
        top: 27vh;
        left: 17vw;
        font-size:larger;
        font-weight: bolder;
    }
    
    .employee-wrapper {
        background: #ccc;
        padding: 10px;
        text-align: center;
        position: relative;
        top: 27vh;
        left: 17vw;
        max-height: 30vh;
        max-width: 30vw;
        overflow-y: auto;
    }
    
    #employee-name, #employee-email, #emp-name-header, #emp-email-header {
        width: 25%;
        padding: 5px;
        background: rgb(238, 237, 237);
    }

    #employee-title, #emp-title-header, #employee-id, #emp-id-header {
        width:25%;
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

    .popup-entry {
        padding: 10px;
    }

    .popup-entry label {
        width:180px;
        clear:left;
        text-align:left;
        padding-right:10px;
    }

</style>