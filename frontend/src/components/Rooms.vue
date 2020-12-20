<template>
  <div class="mainDiv">
    <b-row align-h="center">
      <b-navbar toggleable="sm" type="dark" variant="transparent">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="lg-auto">
            <b-nav-form inline class="ml-auto" align-h="center">
              <b-form-datepicker
                v-model="date"
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric'
                }"
                size="sm"
                class="mr-sm-2"
                id="datepicker-sm"
                locale="en"
              ></b-form-datepicker>
              <b-form-timepicker
                v-model="time"
                size="sm"
                locale="en"
                class="m-2"
              ></b-form-timepicker>
            </b-nav-form>
            <b-nav-item-dropdown class="text" :text="selectedEquipement" right>
              <b-dropdown-item-button
                @click="selectedEquipement = equipement"
                v-for="(equipement, index) in equipements"
                :key="index"
                >{{ equipement }}</b-dropdown-item-button
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </b-row>
    <div>
      <b-row align-h="center" v-if="this.filtredRooms.length != '0'">
        <div class="card" v-for="(item, index) in filtredRooms" :key="index">
          <h2>{{ item.name }}</h2>

          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
            >Capacity :
            <b-badge variant="primary" pill>{{ item.capacity }}</b-badge>
          </b-list-group-item>
          <b-list-group-item
            v-if="item.equipements.length == '0'"
            class="d-flex justify-content-between align-items-center"
            >Equipements :
            <b-badge variant="primary" pill>No Equipements</b-badge>
          </b-list-group-item>
          <b-list-group-item
            v-else
            class="d-flex justify-content-between align-items-center"
            >Equipements :
            <b-badge
              v-for="(equ, index) in item.equipements"
              :key="index"
              variant="primary"
              pill
              >{{ equ.name }}</b-badge
            >
          </b-list-group-item>

          <b-col md="4" offset-md="8">
            <b-button
              v-on:click.prevent="submitRoom(item, date, time)"
              class="b-button"
              variant="primary"
              type="submit"
              size="sm"
              >Reserve</b-button
            ></b-col
          >
        </div>
      </b-row>
      <b-row v-else align-h="center"
        ><b-alert show variant="danger"
          >No Rooms available in this date and time <br />
          try to find another combination</b-alert
        >
      </b-row>
    </div>
    <b-modal
      size="lg"
      ref="modal"
      hide-footer
      title="Hello to StationF reservations App!"
    >
      <b-col class="d-block text-center">
        <h1></h1>
        <h4>Please apply filters before selecting the date and time</h4>
        <h4>Your reservation risks to not be submitted</h4>
      </b-col>
      <router-link class="nav-link" to="/blog"
        ><b-button
          class="mt-2"
          variant="outline-danger"
          block
          @click="hideModal"
          >OK</b-button
        ></router-link
      >
    </b-modal>
    <b-modal
      size="lg"
      ref="modal2"
      hide-footer
      title="You have reserved your !"
    >
      <b-col class="d-block text-center">
        <h1></h1>
        <h4>You have reserved the room with succes</h4>
      </b-col>
      <b-button class="mt-2" variant="outline-primary" block @click="hideModal2"
        >OK</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      selectedEquipement: "Filter by Equipements",
      filtredRooms: this.rooms,
      date: null,
      time: null
    };
  },
  props: {
    rooms: {
      type: Array,
      required: true
    }
  },
  computed: {
    //function to compute the filters input and returns rooms that contains X equipement
    equipements() {
      let equipements = ["All"];
      console.log(this.rooms);
      this.rooms.forEach(room => {
        room["equipements"].forEach(equi => {
          if (!equipements.includes(equi["name"])) {
            equipements.push(equi["name"]);
          }
        });
      });
      return equipements;
    }
  },
  methods: {
    //to show the initial model
    showModal() {
      this.$refs["modal"].show();
    },
    //to hide the intial model
    hideModal() {
      this.$refs["modal"].hide();
    },
    //show modal after reservation
    showModal2() {
      this.$refs["modal2"].show();
    },
    //to hide the model after reservation
    hideModal2() {
      this.$refs["modal2"].hide();
      this.forceRerender();
    },

    //send the query(selected date and time) to the REST API and make a request to rooms
    //that are with this same date and time
    eliminateReservedRooms() {
      let params = {
        date: this.date,
        time: this.time
      };
      axios //Get all reservations from the backend
        .get("http://34.207.239.202:8080/reservedrooms", { params })
        .then(resp => {
          this.reservedRooms = resp.data.reservation.map(
            element => element.name
          );
          console.log(this.reservedRooms);
          //if no reserved rooms with this date and time so we return all the rooms
          if (this.reservedRooms.length == "0") {
            this.filtredRooms = this.rooms;
          } else {
            //here we choose only rooms that are not reserved
            this.filtredRooms = this.filtredRooms.filter(
              room => !this.reservedRooms.includes(room.name)
            );
          }
        });
    },
    forceRerender() {
      // Remove my-component from the DOM
      this.renderComponent = false;

      this.$nextTick(() => {
        // Add the component back in
        this.renderComponent = true;
      });
    },
    //reserve a Room to the data base
    submitRoom(item, date, time) {
      if (date == null || time == null) {
        alert("Select Date and Hour please");
      } else {
        let itemTostore = item;
        console.log(date);
        itemTostore["date"] = date;
        itemTostore["time"] = time;
        console.log(itemTostore);
        axios.post("http://localhost:8082/reserve", item);
        this.showModal2();
      }
    }
  },
  //to show the use model when component mounts
  mounted() {
    this.showModal();
  },
  watch: {
    //to watch the filter and change the DOM when the filtr change
    selectedEquipement(newVal, oldVal) {
      this.filtredRooms = [];
      if (newVal == "All") {
        this.filtredRooms = this.rooms;
      } else {
        this.rooms.forEach(room => {
          room.equipements.forEach(equip => {
            if (equip.name == newVal) this.filtredRooms.push(room);
          });
        });
      }
    },
    //to watch the date and time,then execute the elimination function
    date(newVal, oldVal) {
      if (this.time == null) {
        //we do nothing
      } else {
        this.eliminateReservedRooms();
      }
    },
    time(newVal, oldVal) {
      if (this.date == null) {
        //we do nothing
      } else {
        this.eliminateReservedRooms();
      }
    }
  }
};
</script>
<style scoped>
.mainDiv {
  height: 100%;
  justify-content: center;
  overflow-x: hidden;
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
  margin: 15px;
  color: #171717;
  border-radius: 16px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 23em;
  padding: 5px;
  box-shadow: -15px 15px 10px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.card:hover {
  box-shadow: -15px 15px 28px #171717, 0 10px 10px #171717;
  transform: translateY(-25px);
}
</style>
