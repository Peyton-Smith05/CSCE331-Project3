<template>
<body>        
    <div class="login-page">
        <div class="login-logo">
            <img id="kft-banner" src="./assets/KFTBanner.jpg" alt="">
        </div>
        <p id="title">
            Kung Fu Tea
        </p>
        <div class="login-entry">
            <form class="login-container">
                <label id="email-label" for="email">Login:</label>
                <input id="email-entry" type="text" onfocus="this.value=''" value="email@example.com">
                <br>
                <label id="pswd-label" for="pswd">Password:</label>
                <input id="pswd-entry" type="text" onfocus="this.value=''" value="E.g. 1234">
                <br>
                <input @click="goToCashier()" id="submit-btn" type="submit">
            </form>
        </div>
    </div>    
</body>
</template>
<script>
export default {
    methods: {
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
    color:white;
    top: 35.5vh;
    left: 20vh;
    font-size: 120px;
    font-weight: 500;
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

#submit-btn {
    position: relative;
    margin: 5px;
    left:-5vw;
}
</style>