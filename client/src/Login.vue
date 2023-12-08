<template>
    <body>
      <div class="login-page">
        <LoginPopup v-if="popupError" :closePopup="closePopup">
          <h2> Log in error: </h2>
          <br />
          An incorrect email/password was provided. Please make sure to type the correct user information.
          <br />
        </LoginPopup>
        <div class="login-logo">
          <img id="kft-banner" src="./assets/KFTBanner.jpg" alt="" />
        </div>
        <TextSlider></TextSlider>
        <img id="title" src="./assets/Kung_Fu_Tea_Official_Logo.png" alt="" />
        <div class="login-entry">
          <form class="login-container">
            <label id="email-label" :style="{ fontSize: LogPassFontMod }" for="email">Login:</label>
            <input id="email-entry" :style="{ fontSize: LogPassFontMod }" type="text" v-model="email" placeholder="email@example.com" />
            <br />
            <label id="pswd-label" :style="{ fontSize: LogPassFontMod }" for="pswd">Password:</label>
            <input id="pswd-entry" :style="{ fontSize: LogPassFontMod }" type="password" v-model="pswd" placeholder="e.g 1234" />
            <br />
            <div class="login-sections">
              <input @click="login" :style="{ fontSize: LogPassFontMod }" id="submit-btn" type="button" value="Submit" />
              <br />
              <GoogleLogin class="google-oauth" :callback="handleGoogleOAuth" prompt auto-login />
            </div>
          </form>
        </div>
      </div>
    </body>
  </template>


<script>
import axios from 'axios';
import { useRouter } from 'vue-router'
import { googleOneTap } from 'vue3-google-login';
import { decodeCredential } from 'vue3-google-login';
import LoginPopup from './components/LoginPopup.vue';
import { ref, inject, computed} from 'vue';
import TextSlider from './TextSlider.vue';


const apiRedirect =
  window.location.href.slice(0, 17) === 'http://localhost:'
    ? 'http://localhost:3000'
    : '';

export default {
  components: {
    LoginPopup,
    TextSlider
  },
  setup() {
    const apiRedirect = (window.location.href.slice(0,17) == "http://localhost:") ? "http://localhost:3000/api" : "/api";
    const router = useRouter()
    const globalData = inject('globalTextMod');
    const email = ref('');
    const pswd = ref('');
    const empid = ref(0);
    const popupError = ref(false);


    const login = async () => {
      try {
        const login_query = apiRedirect + "/login/info/" + email.value;
        const response = await axios.get(login_query);
        // If it is no cashier/manager simply go straight to customer.
        if(response.data.length == 0) {goToCustomer();}
        const user_info = response.data[0];
        if(user_info.password !== pswd.value) {throw new Error("Invalid Password was provided");}
        // Start routing to customer, cashier, and manager.
        if(user_info.title == "Cashier") {
            empid.value = user_info.empid;
            goToCashier(user_info.empid);
        } else if(user_info.title == "Manager") {
            goToManager();
        }
      } catch (error) {
          openPopup()
          console.error(error);
      }
    };

    const LogPassFontMod = computed(() => {
        const textSize = 20;
        return `${textSize * globalData.textMod}px`;
    });

    const handleGoogleOAuth = async (res) => {
      try {
        const decoded_data = decodeCredential(res.credential);
        const googleOAuthEmail = decoded_data.email; 

        const google_login_query = apiRedirect + "/login/info/" + googleOAuthEmail;
        const response = await axios.get(google_login_query);
        const user_info = response.data[0];

        if (!user_info) {
          goToCustomer();
        }
        
        if (user_info.title === 'Cashier') {
          goToCashier();
        } else if (user_info.title === 'Manager') {
          goToManager();
        } else {
          goToCustomer();
        }
      } catch (error) {
        openPopup();
        console.error(error);
      }
    };

    const openPopup = () => {
      popupError.value = true;
    };

    const closePopup = () => {
      popupError.value = false;
    };

    const goToCashier = () => {
      // Navigate to the cashier interface page using Vue Router
      router.push({
          name: 'CashierMenuItems',
          query: {
              empid: JSON.stringify(empid.value),
          }
      });
    };
    const goToCustomer = () => {
      router.push({
          name: 'CustomerMenuItems',
          query: {
              empid: JSON.stringify(0),
          }
      });
    };

    const goToManager = (empid) => {
      console.log('Rerouting to manager side');
      router.push({
        name: 'Manager',
        query: {
          empid: JSON.stringify(empid),
        },
      });
    };

    return {
      empid,
      email,
      pswd,
      popupError,
      login,
      handleGoogleOAuth,
      openPopup,
      closePopup,
      goToCashier,
      goToCustomer,
      goToManager,
      LogPassFontMod,
    };
  },
};
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