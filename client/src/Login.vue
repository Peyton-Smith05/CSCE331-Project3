<template>
<body>        
    <div class="login-page">
        <LoginPopup v-if="popupError" :closePopup="() => closePopup()"> 
            <h2> Log in error: </h2>
            <br>
            An incorrect email/password was provided. Please make sure to type the correct user information.
            <br>
        </LoginPopup>   
        <div class="login-logo">
            <img id="kft-banner" src="./assets/KFTBanner.jpg" alt="">
        </div>
        <img id="title" src="./assets/Kung_Fu_Tea_Official_Logo.png" alt="">
        <div class="login-entry">
            <form class="login-container">
                <label id="email-label" for="email">Login:</label>
                <input id="email-entry" type="text" v-model="email" placeholder="email@example.com">
                <br>
                <label id="pswd-label" for="pswd">Password:</label>
                <input id="pswd-entry" type="password" v-model="pswd" placeholder="e.g 1234">
                <br>
                <div class="login-sections">
                    <input @click="login()" id="submit-btn" type="button" value="Submit">
                    <br>
                    <GoogleLogin class="google-oauth" :callback="callback" prompt auto-login/>
                </div>
            </form>
        </div>
    </div>
</body>
</template>
<script>
import axios from 'axios'
import { googleOneTap } from 'vue3-google-login'
import { decodeCredential } from 'vue3-google-login'
import LoginPopup from './components/LoginPopup.vue'

const apiRedirect = (window.location.href.slice(0,17) == "http://localhost:") ? "http://localhost:3000" : "";

export default {
    components: {
        LoginPopup
    },
    data() {
        return {
            callback:(response) => {
                googleOneTap({ autoLigin: true })
                .then((response) => {
                    const userData = decodeCredential(response.credential)
                    this.email = userData.email
                    // Handling email from backend.
                    handleGoogleOAuth();
                })
                .catch((error) => {
                    console.error(error);
                })
            },
            empid: 0,
            email: '',
            pswd:  '',
            popupError: false,
        }
    },
    methods: {
        async login() {
            try {
                const login_query = apiRedirect + "/login/info/" + this.email;
                const response = await axios.get(login_query);

                // If it is no cashier/manager simply go straight to customer.
                if(response.data.length == 0) {this.goToCustomer();   }
                const user_info = response.data[0];
                if(user_info.password !== this.pswd) {throw new Error("Invalid Password was provided");}
                // Start routing to customer, cashier, and manager.
                if(user_info.title == "Cashier") {
                    this.empid = user_info.empid;
                    this.goToCashier(user_info.empid);
                } else if(user_info.title == "Manager") {
                    this.goToManager();
                }
            } catch (error) {
                this.openPopup()
                console.error(error);
            }
        },
        async handleGoogleOAuth() {
            try {
                const google_login_query = apiRedirect + "/login/info/" + this.email;
                const response = await axios.get(google_login_query);
                const user_info = response.data[0];
                
                // Start routing to customer, cashier, and manager.
                if(user_info.title == "Cashier") {
                    this.goToCashier();
                } else if(user_info.title == "Manager") {
                    this.goToManager();
                } else if(user_info.title == "Customer") {
                    this.goToCustomer();   
                }
            } catch (error) {
                this.goToCashier();
            }
        },

        openPopup() {
            this.popupError = true;
        },
        closePopup() {
            this.popupError = false;
        },
        
        goToCashier() {
            // Navigate to the cashier interface page using Vue Router
            this.$router.push({
                name: 'Cashier',
                query: {
                    empid: JSON.stringify(this.empid),
                }
            });
        },
        goToCustomer() {
            this.$router.push({
                name: 'Customer',
                query: {
                    empid: JSON.stringify(0),
                }
            });
        },
        goToManager(empid) {
            // TODO create rerouting to manager site.
            console.log("Rerouting to manager side");
            this.$router.push({
                name: 'Manager',
                query: {
                    empid: JSON.stringify(empid),
                }
            });
        },
        goToCustomer() {
            this.$router.push('/customer');
        },
        goToManager() {
            // TODO create rerouting to manager site.
            console.log("Rerouting to manager side");
            this.$router.push('/manager');
        },
    },
}
</script>
<style>
.login-page {
    position: absolute;
    top: 0;
    left: 0;
}

#kft-banner {
    width:100vw;
    max-height:55vh;
    overflow: auto;
}

#title {
    position: absolute;
    left: 5vw;
    top: 5vh;
    margin: 20px;
    max-width: 20vw;
}

.login-container{
    text-align: right;
    position: relative;
    width:30vw;
    left: 25vw;
}

#email-label {
    text-align: center;
    padding: 10px;
    font-size: 20px;
    margin: 20px;
    font-weight: bold;
}

#email-entry {
    margin: 10px;
    padding:5px;
}


#pswd-label {
    text-align: center;
    padding: 10px;
    font-size: 20px;
    margin: 20px;
    font-weight: bold;
}

#pswd-entry {
    margin: 10px;
    padding:5px;
}

.login-sections {
    position:relative;
    vertical-align: middle;
    text-align: center;
    left: 7vw;
}

#submit-btn {
    font-size: 15px;
    margin: 10px;
}

#google-oauth {
    margin: 10px;
}

</style>