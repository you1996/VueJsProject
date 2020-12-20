const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//reservation schema(collection)
const ReservationSchema = Schema({
  name: { type: String, required: true },
  description: { type: String },
  capacity: { type: Number },
  equipements: [{ name: { type: String } }],
  date: Date,
  time: { type: Object },
});
const Reservation = mongoose.model("Reservation", ReservationSchema);
module.exports = Reservation;
