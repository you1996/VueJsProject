<template>
  <div class="div">
    <div class="Home">
      <b-col col lg="4">
        <router-link to="/"
          ><b-icon icon="arrow-left" aria-hidden="true"></b-icon
        ></router-link>
      </b-col>

      <b-container class="divv">
        <b-row>
          <b-col>
            <b-row class="my-2" v-for="(type, index) in types" :key="index">
              <b-col sm="4">
                <h5 class="text-white">{{ type }}:</h5>
              </b-col>
              <b-col sm="5" v-if="type == 'Auteur'">
                <b-form-input
                  v-model.lazy="Auteur"
                  placeholder="Auteur de Recette"
                ></b-form-input>
              </b-col>

              <b-col sm="5" v-if="type == 'Nom'">
                <b-form-input
                  v-model.lazy="Nom"
                  placeholder="Nom"
                ></b-form-input>
              </b-col>
              <b-col sm="5" v-if="type == 'Nb_personnes'"
                ><b-form-input
                  v-model.lazy="Nb_personnes"
                  placeholder="Nombre de personnes"
                ></b-form-input>
              </b-col>

              <b-col sm="5" v-if="type == 'Etapes'">
                <b-form-input
                  :placeholder="type"
                  v-model.lazy="Etape"
                ></b-form-input>
              </b-col>
              <b-col class="align" sm="3" v-if="type == 'Etapes'">
                <b-button
                  id="buttontarget"
                  variant="warning"
                  @click="addEtape()"
                  ><b-icon icon="plus-square" aria-hidden="true"></b-icon
                ></b-button>
              </b-col>
              <b-col sm="5" v-if="type == 'Ingrédients'">
                <b-form-input
                  :placeholder="type"
                  v-model.lazy="Ingrédient"
                ></b-form-input>
              </b-col>

              <b-col class="align" sm="3" v-if="type == 'Ingrédients'">
                <b-button variant="warning" @click="addIngrédient()"
                  ><b-icon icon="plus-square" aria-hidden="true"></b-icon
                ></b-button>
              </b-col>
            </b-row>
            <b-row>
              <h5 class="text-white">
                <b-badge variant="danger">Vos Ingrédients</b-badge>
              </h5>
              <h5
                class="text-white"
                v-for="(Ingr, index) in Ingrédients"
                :key="index"
              >
                &nbsp;
                <b-badge variant="warning">
                  &nbsp;{{ index + 1 }}-{{ Ingr }}&nbsp;
                </b-badge>
              </h5>
            </b-row>
            <b-row>
              <h5 class="text-white">
                <b-badge variant="danger">Les Etapes </b-badge>
              </h5>
              <h5
                class="text-white"
                v-for="(Etap, index) in Etapes"
                :key="index"
              >
                &nbsp;<b-badge variant="warning"
                  >&nbsp;{{ index + 1 }}-{{ Etap }}&nbsp;</b-badge
                >
              </h5>
            </b-row>
          </b-col>
          <b-col>
            <b-col cols="10">
              <b-form-file
                v-model="Image"
                accept="image/*"
                label="Image"
                placeholder="Ajouter la photo de recette"
                @change="onFileChange"
                id="file-default"
              ></b-form-file>
              <b-container
                style="margin-top:15px; border-radius: 5px;"
                fluid
                class="p-4 bg-light"
              >
                <b-row>
                  <b-col v-if="previewImage == null">
                    <b-badge variant="warning">Preview</b-badge>
                  </b-col>
                  <b-col v-if="previewImage != null">
                    <b-img
                      style="max-height:280px"
                      thumbnail
                      :src="previewImage"
                    ></b-img>
                  </b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-col>
        </b-row>
        <b-row align-h="center"
          ><b-button variant="danger" @click="submitRecette()"
            ><b-icon icon="check" aria-hidden="true"></b-icon
            >&nbsp;&nbsp;Ajouter&nbsp;&nbsp;
          </b-button></b-row
        >
      </b-container>
      <b-modal size="md" ref="modal" hide-footer hide-title>
        <b-row
          ><b-col lg="12" class="d-block text-center">
            <h1></h1>
            <h4>Enregistré !</h4>
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
      <b-modal size="md" ref="modal2" hide-footer hide-title>
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
      <b-popover
        :show="tooltipVar"
        ref="popover"
        :placement="'bottomright'"
        target="buttontarget"
        variant="danger"
      >
        Ajouter l'ingrédient ou l'étape a la file d'enregistrement
      </b-popover>
    </div>
  </div>
</template>

<script>
import { BRow } from "bootstrap-vue";

import { BCol } from "bootstrap-vue";

import axios from "axios";
export default {
  components: {
    BRow,
    BCol
  },
  data() {
    return {
      previewImage: null,
      Image: null,
      tooltipVar: false,
      Ingrédient: "",
      Etape: "",
      Ingrédients: [],
      Etapes: [],
      Nom: null,
      Auteur: null,
      Nb_personnes: null,
      types: ["Auteur", "Nom", "Ingrédients", "Etapes", "Nb_personnes"]
    };
  },

  created() {
    //handling the time to show and hide the tooltips
    setTimeout(
      () => (this.tooltipVar = true),

      1000
    );
    setTimeout(
      () => this.$refs.popover.$emit("disable"),

      6000
    );
    setTimeout(
      () => (this.tooltipVar = false),

      5500
    );
    ////
  },
  methods: {
    
    showModalSubmit() {
      this.$refs["modal"].show();
    },
    hideModalSubmit() {
      this.$refs["modal"].hide();
    },
    showModalError() {
      this.$refs["modal2"].show();
    },
    hideModalError() {
      this.$refs["modal2"].hide();
    },
    onFileChange(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e => {
        this.previewImage = e.target.result;
      };
    },
    ///Onclickhandler to add the ingredient to an array
    addIngrédient() {
      if (this.Ingrédient == "") {
        this.showModalError();
      } else {
        this.Ingrédients.push(this.Ingrédient);
        this.Ingrédient = "";
      }
    },
    ////
    ///Onclickhandler to add the Etape to an array
    addEtape() {
      if (this.Etape == "") {
        this.showModalError();
      } else {
        this.Etapes.push(this.Etape);
        this.Etape = "";
      }
    },

    ///verifie data and send it to backend 
    submitRecette() {
      if (
        this.previewImage == null ||
        this.Ingrédients.length == 0 ||
        this.Etapes.length == 0 ||
        this.Nom == null ||
        this.Auteur == null ||
        this.Nb_personnes == null ||
        isNaN(this.Nb_personnes) == true
      ) {
        this.showModalError();
      } else {
        let Recette = {};
        Recette["Image"] = this.previewImage;
        Recette["Ingrédients"] = this.Ingrédients;
        Recette["Etapes"] = this.Etapes;
        Recette["Nom"] = this.Nom;
        Recette["Auteur"] = this.Auteur;
        Recette["Nb_personnes"] = this.Nb_personnes;
        console.log(Recette);
        axios.post(
          "http://desolate-wildwood-60843.herokuapp.com/addRecette",
          Recette
        );
        (this.Ingrédients = []), (this.Etapes = []);
        this.showModalSubmit();
      }
    }
  }
};
</script>
<style>
.div {
  text-align: center;
}
h5 {
  text-align: left;
}

.Home {
  margin-top: 40px;
  border-image-slice: 3;
  border-width: 5px;
  background: rgba(0, 0, 0, 0.6);
}

.Home h1 {
  color: rgb(255, 255, 255);
  font-size: 72px;
  text-transform: capitalize;
}
.align {
  text-align: left;
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
