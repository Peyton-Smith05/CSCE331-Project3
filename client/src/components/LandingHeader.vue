<template>
  <!-- @vuese
  This template renders the landing page header, which includes the logo, a text slider component, and two buttons for navigation. The buttons are styled dynamically based on a global font size modifier. -->
  <div class="landing-header">
    <header>
      <img src="./assets/Kung_Fu_Tea_Official_Logo.png" alt="Boba Tea Shop Logo" class="logo" />
      <TextSlider></TextSlider>
      <h2></h2>
      <div class="buttons">
        <!-- Buttons to navigate to menu and login -->
        <button :style="{ fontSize: buttonFontSize }" @click="goToMenu">View Menu</button>
        <button :style="{ fontSize: buttonFontSize }" @click="goToLogin">Login</button>
      </div>
    </header>
  </div>
</template>

<script>
  import TextSlider from './TextSlider.vue'
  import { inject, computed} from 'vue';
  import { useRouter } from 'vue-router'

export default {
  components: {
    TextSlider 
  },
  setup() {
    // Inject the global variable 'textMod'
    const globalData = inject('globalTextMod');
    // Set the initial textSize here or fetch it from some source
    const router = useRouter()
    /**
     * @vuese
     * A computed property that calculates the font size for buttons based on a global modifier.
     */
    const buttonFontSize = computed(() => {
      const textSize = 13;
      return `${textSize * globalData.textMod}px`;
    });

    /**
     * @vuese
     * Navigates to the menu page when invoked.
     */
    const goToMenu = () => {
      router.push('/menu');
    };

    /**
     * @vuese
     * Navigates to the login page when invoked.
     */
    const goToLogin = () => {
      router.push('/login');
    };

    return {
      buttonFontSize,
      goToMenu,
      goToLogin
    };
  }
};
</script>

<style scoped>

.landing-header {
  background-color: rgba(235,12,67,255);
  padding: 2px;
  z-index: 6;
  width: 100vw;
  height: 10vh;
  margin: 0;
  position: fixed; 
  top: 0; 
  left: 0;
  padding-right: 10px;
}

header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  width: auto;
  height: 100%; 
  max-height: 75px;
}

.landing button {
    background-color: #fff;
    color: #000;
    border: none;
    padding: 10px 10px;
    font-size: (13 * textSize)px;
    cursor: pointer;
}

.buttons {
  flex-direction: row;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
}
</style>

