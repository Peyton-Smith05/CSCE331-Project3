<template>
<body>        
    <div class="login-page">
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
                <input id="pswd-entry" type="text" v-model="pswd" placeholder="E.g. 1234">
                <br>
                <div class="login-sections">
                    <input @click="login(email, pswd)" id="submit-btn" type="button" value="Submit">
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

const apiRedirect = (window.location.href.slice(0,17) == "http://localhost:") ? "http://localhost:3000" : "";

export default {
    data() {
        return {
            callback:(response) => {
                this.goToCashier()
            },
            email: "",
            pswd: "",
        }
    },
    methods: {
        async login(email, pswd) {
            // Creating API request to check and verify email and pswd
            // from server side.
            try {
                const response = await axios.get(apiRedirect + "/user/credentials");
            } catch(error) {
                console.error(error);
            }
            return;
        },
        goToCashier() {
            // Navigate to the cashier interface page using Vue Router
            this.$router.push('/cashier');
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