<template>
  <b-container fluid class="background">
    <Home />
    <Rooms v-bind:rooms="roomsData" />
  </b-container>
</template>

<script>
import Home from "./components/Home";
import Rooms from "./components/Rooms";
import data from "../rooms.json";
export default {
  name: "app",
  components: {
    Home,
    Rooms
  },
  data() {
    return { roomsData: data.rooms };
  }
};
</script>
<style>
.background {
  background-image: url(https://media-exp1.licdn.com/dms/image/C4D1BAQH31eFUVlSq9w/company-background_10000/0?e=2159024400&v=beta&t=ZqPx08hFNzl0aX6XOYLNWYhL3SZEugkWqstBiJiN9r0);
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  backdrop-filter: blur(4px);
}
</style>
