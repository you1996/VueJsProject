<template>
  <div class="div">
    <div class="Home">
      <img
        src="https://cdn.welcometothejungle.co/uploads/website/logo/1272/149677/station-f.png"
      />
      <h1>
        Welcome to Station F <br />
        <span>Choose your Room and reserve Easly</span>
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  props: ["Rooms"]
};
</script>
<style>
.div {
  text-align: center;
}
.Home {
  border-image-slice: 3;
  border-width: 5px;
  background: rgba(0, 0, 0, 0.6);
}
.Home h1 {
  color: rgb(255, 255, 255);
  font-size: 72px;
  text-transform: capitalize;
}

.Home h1 span {
  font-size: 20px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 4px;
  line-height: 3em;
  padding-left: 0.25em;
  color: rgb(255, 255, 255);
  padding-bottom: 10px;
}
.alt-Home h1 {
  text-align: center;
}
.alt-Home h1:before {
  left: 50%;
  margin-left: -30px;
}
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap");

section {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
