<template>
  <div class="div">
    <b-container fluid class="background">
      <transition name="moveInUp">
        <router-view />
      </transition>
    </b-container>
  </div>
</template>

<script>
import Home from "./components/Home.vue";
import Recettes from "./components/Recettes.vue";

export default {
  name: "app",
  components: {
    Home,
    Recettes
  },
  data() {
    return {};
  },

  methods: {}
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap");

.background {
  background-image: url(https://wallpapershome.com/images/pages/pic_h/403.jpg);
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  backdrop-filter: blur(4px);
}
.div {
  background-image: url(https://wallpapershome.com/images/pages/pic_h/403.jpg);
  width: 100%;
  height: 100%;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
.moveInUp-enter-active {
  animation: fadeIn 1s ease-in-out;
}
.moveInUp-leave-active {
  animation: moveInUp 0.9s ease-in-out;
}
@keyframes moveInUp {
  0% {
    transform: translateX(300);
  }
  100% {
    transform: translateX(-2000px);
  }
}
</style>
