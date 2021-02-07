<template>
  <div class="div">
    <div class="Home">
      <h1>Poly M'Angers <br /></h1>
    </div>

    <b-row>
      <b-col col lg="4">
        <div class="wrapper">
          <div>
            <router-link class="a" to="/Search"
              ><span class="span">Trouver une Recette</span></router-link
            >
            <div class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 268.832 268.832"
              >
                <path
                  d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z"
                />
              </svg>
            </div>
          </div></div
      ></b-col>
      <b-col col lg="4" offset-lg="3">
        <div class="wrapper">
          <div>
            <router-link class="a" to="/addRecette"
              >Ajouter une Recette</router-link
            >
            <div class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 268.832 268.832"
              >
                <path
                  d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z"
                />
              </svg>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script></script>
<style>
.div {
  text-align: center;
}
.Home {
  margin-bottom: 100px;
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

.span {
  margin-top: 100px;
}

.a {
  font-size: 18px;
  display: block;
  width: 350px;
  height: 40px;
  text-decoration: none;
  background: rgba(0, 0, 0, 0.9);
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.35s;
}

.icon {
  width: 50px;
  height: 50px;
  border: 3px solid transparent;
  position: absolute;
  transform: rotate(45deg);
  right: 0;
  top: 0;
  z-index: -1;
  transition: all 0.35s;
}

.icon svg {
  width: 30px;
  position: absolute;
  top: calc(50% - 15px);
  left: calc(50% - 15px);
  transform: rotate(-45deg);
  fill: #ec2932;
  transition: all 0.3s;
}

.a:hover {
  text-decoration: none;

  font-size: 16px;
  width: 250px;
  border: 3px solid #ec2932;
  background: rgba(0, 0, 0, 0.6);
  color: #ec2932;
}

.a:hover + .icon {
  text-decoration: none;
  border: 5px solid #ec2932;
  right: -8%;
  z-index: 0;
}
</style>
