<template>
  <div class="landing-header">
    <header>
      <img src="./assets/Kung_Fu_Tea_Official_Logo.png" alt="Boba Tea Shop Logo" class="logo" />
      <TextSlider></TextSlider>
      <h2></h2>
      <div class="buttons">
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
    TextSlider // Register the TextSlider component
  },
  setup() {
    // Inject the global variable 'textMod'
    const globalData = inject('globalTextMod');
    // Set the initial textSize here or fetch it from some source
    const router = useRouter()
    // Calculate button font size based on textSize and textMod
    const buttonFontSize = computed(() => {
      const textSize = 13;
      return `${textSize * globalData.textMod}px`;
    });

    // Define methods like goToMenu and goToLogin
    const goToMenu = () => {
      router.push('/menu');
    };

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

