<template>
  <div class="mainDiv">
    <div class="wrapper">
      <b-col col lg="4">
        <router-link to="/"
          ><b-icon icon="arrow-left" aria-hidden="true"></b-icon
        ></router-link>
      </b-col>
    </div>
    <b-row align-h="center" class="text-center">
      <h5 class="text-white">Saisir Vos Ingrédients :</h5>
      <b-col sm="3">
        <b-form-input
          placeholder="ingrédient"
          v-model.lazy="Ingrédient"
        ></b-form-input>
      </b-col>
      <b-col class="align" sm="1">
        <b-button id="buttontarget" variant="warning" @click="addIngrédient()"
          ><b-icon icon="plus-square" aria-hidden="true"></b-icon
          ><b-popover
            ref="popover"
            :show="tooltipVar"
            :placement="'bottomleft'"
            target="buttontarget"
            variant="danger"
          >
            Ajouter l'ingrédient a la file de recherche
          </b-popover></b-button
        >
      </b-col>
      <b-col class="align" sm="3">
        <h6 class="text-white">
          Ajuster la recherche :<br /><span>Nombre de recettes à afficher</span>
        </h6>
        <b-form-input
          id="range-2"
          v-model="relevance"
          type="range"
          min="1"
          max="10"
          step="1"
        ></b-form-input>

        <h6 class="text-white">{{ relevance }}</h6>
      </b-col>
      <b-row>
        <b-col cols="8" md="auto">
          <h4>
            <b-badge variant="danger">{{ IngrédientsSearch }}</b-badge>
          </h4>

          <h5
            class="text-white"
            v-for="(Ingr, index) in Ingrédients"
            :key="index"
          >
            <b-badge variant="warning"
              >&nbsp;{{ index + 1 }}-{{ Ingr }}&nbsp;</b-badge
            >
          </h5>
        </b-col>
      </b-row>
    </b-row>

    <b-button class="button" variant="danger" @click="filterRecettes()"
      ><b-icon icon="search" aria-hidden="true"></b-icon
      >&nbsp;&nbsp;Chercher&nbsp;&nbsp; </b-button
    ><b-button class="button" variant="danger" @click="reset()"
      ><b-icon icon="arrow-repeat" aria-hidden="true"></b-icon
      >&nbsp;&nbsp;Reset&nbsp;&nbsp;
    </b-button>
    <div>
      <div v-if="this.FiltredRecettes == null" class="text-center">
        <b-spinner variant="danger" label="Text Centered"></b-spinner>
      </div>
      <div v-else>
        <b-card
          v-for="item in this.FiltredRecettes"
          :key="item.id"
          v-bind:header="item.Nom"
          style="width:auto;"
          class="mb-2"
          header-text-variant="white"
          header-bg-variant="danger"
        >
          <b-row no-gutters>
            <b-col md="6" class="text-md-left">
              <b-card-img
                v-bind:src="item.Image"
                alt="Image"
                class="mb-2"
              ></b-card-img>
              <h2 class="text-danger">Recette pour :</h2>
              <b-badge variant="warning" pill>{{ item.Recette_pour }}</b-badge>
              personnes<br />
              <h2 class="text-danger">Ingrédients :</h2>
              <b-badge
                v-for="(ingrd, index) in item.Ingredients"
                :key="index"
                variant="warning"
                pill
                >{{ ingrd }}
              </b-badge>
              <br />
            </b-col>
            <b-col md="6">
              <b-card-body>
                <b-card-text>
                  <h3 v-if="item.Auteur != ''" class="text-danger">
                    Auteur :
                    <b-badge variant="warning" pill>{{ item.Auteur }}</b-badge>
                  </h3>
                  <h3 v-else class="text-danger">
                    Auteur :
                    <b-badge variant="warning" pill>Inconnu</b-badge>
                  </h3>
                  <br />

                  <b-col class="text-lg-left">
                    <h2 class="text-danger">Etapes :</h2>
                    <b-list-group-item
                      class="text-lg-left"
                      v-for="(ing, index) in item.Etapes"
                      :key="index + 'i'"
                      variant="light"
                      ><b-row>
                        <b-col cols="1"
                          ><b-badge variant="warning" pill>{{
                            index
                          }}</b-badge></b-col
                        >
                        <b-col>{{ ing }}</b-col>
                      </b-row>
                    </b-list-group-item>
                  </b-col>
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </div>
      <b-modal size="md" ref="modal1" hide-footer hide-title>
        <b-row
          ><b-col lg="12" class="d-block text-center">
            <h1></h1>
            <h4>S'il vous plait vérifier votre saisie !</h4>
          </b-col>
          <b-col lg="6" offset-md="3">
            <b-button
              variant="outline-danger"
              block
              @click="hideModalError"
              hand-thumbs-up
              ><b-icon icon="hand-thumbs-up" aria-hidden="true"></b-icon
              >Ok</b-button
            ></b-col
          ></b-row
        >
      </b-modal>
      <b-modal size="md" ref="modal" hide-footer hide-title>
        <b-row
          ><b-col lg="12" class="d-block text-center">
            <h1></h1>
            <h4>Donner Vos Ingrédients !</h4>
          </b-col>
          <b-col lg="6" offset-md="3">
            <b-button
              variant="outline-danger"
              block
              @click="hideModalSubmit"
              hand-thumbs-up
              ><b-icon icon="hand-thumbs-up" aria-hidden="true"></b-icon
              >Ok</b-button
            ></b-col
          ></b-row
        >
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      FiltredRecettes: null,
      Ingrédients: [],
      Ingrédient: "",
      relevance: 1,
      resetRecettes: [],
      tooltipVar: false
    };
  },
  async beforeCreate() {
    axios //Get all recettes from the backend
      .get("http://desolate-wildwood-60843.herokuapp.com/bringRecettes")
      .then(resp => {
        this.FiltredRecettes = resp.data;
        this.resetRecettes = resp.data;
      });
  },
  created() {
    setTimeout(
      () => (this.tooltipVar = true),

      2000
    );
    setTimeout(
      () => this.$refs.popover.$emit("disable"),

      7000
    );
    setTimeout(
      () => (this.tooltipVar = false),

      6500
    );
  },

  computed: {
    ////Handle the text when the query array is empty or not
    IngrédientsSearch() {
      if (this.Ingrédients.length == 0) {
        return "Pas d'ingrédients";
      } else {
        return "Les Ingrédients pour ce recherche";
      }
    }
  },
  methods: {
    showModalError() {
      this.$refs["modal1"].show();
    },
    hideModalError() {
      this.$refs["modal1"].hide();
    },
    //reset button handler
    reset() {
      this.FiltredRecettes = this.resetRecettes;
      this.Ingrédients = [];
    },
    showModalSubmit() {
      this.$refs["modal"].show();
    },
    hideModalSubmit() {
      this.$refs["modal"].hide();
    },
    ///handle the search
    filterRecettes() {
      if (this.Ingrédients.length != 0) {
        let params = {
          relevance: this.relevance,
          Ingrédients: this.Ingrédients
        };
        axios //Get Recettes by sending the query to mongodb search index
          .get("http://desolate-wildwood-60843.herokuapp.com/filterRecettes", {
            params
          })
          .then(resp => {
            this.FiltredRecettes = resp.data;
          });
      } else {
        this.showModalSubmit();
      }
    },
    ///Add the ingredient to the ingredients list
    addIngrédient() {
      if (this.Ingrédient == "") {
        this.showModalError();
      } else {
        this.Ingrédients.push(this.Ingrédient);
        this.Ingrédient = "";
      }
    }
  }
};
</script>
<style scoped>
.mainDiv {
  height: auto;
  justify-content: center;
  text-align: center;
  border-image-slice: 3;
  border-width: 5px;
  background: rgba(0, 0, 0, 0.6);
}
.mainDiv h1 {
  color: black;
  font-size: 72px;
  text-transform: capitalize;
}
.b-button {
  margin: 9px;
}
.button {
  margin: 30px;
}
.rooms {
  flex-direction: row;
}

.mainDiv h1 span {
  font-size: 20px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 4px;
  line-height: 3em;
  padding-left: 0.25em;
  color: rgb(255, 255, 255);
  padding-bottom: 10px;
}
.alt-mainDiv h1 {
  text-align: center;
}
.alt-mainDiv h1:before {
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
.text {
  border: 1px solid;
  border-radius: 3px;
  color: white;
  width: 200px;
  height: 37px;
  margin-top: 7px;
}
.card {
  margin: 35px;
  color: #171717;

  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 23em;
  padding: 1px;
  opacity: 0.9;
  box-shadow: -15px 15px 10px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.card:hover {
  box-shadow: -15px 15px 28px #171717, 0 10px 10px #171717;
  transform: translateY(-20px);
}
.b-list-group-item {
  list-style: decimal inside;
}
a {
  border: 1px solid #ec2932;
  margin-top: 10px;
  font-size: 18px;
  display: block;
  width: 100px;
  height: 40px;
  text-decoration: none;
  background: rgba(0, 0, 0, 0.6);
  text-align: center;
  color: #ec2932;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.35s;
}

a:hover {
  font-size: 16px;
  width: 80px;
  background: #ec2932;
  color: #ffffff;
}
</style>
