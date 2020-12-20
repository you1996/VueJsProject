const Reservation = require("../Models/Reservation");

module.exports.controller = (app) => {
  // fetch all reservations from database if exits with the same date and time
  //req.query is data from axios "params" get request
  app.get("/reservedrooms", (req, res) => {
    Reservation.find(
      { date: req.query.date, time: req.query.time },
      (error, reservation) => {
        if (error) {
          console.log(error);
        }
        res.send({ reservation });
      }
    );
  });
  //post the room to the data base
  app.post("/reserve", (req, res) => {
    const new_reservation = new Reservation({
      name: req.body.name,
      description: req.body.description,
      capacity: req.body.capacity,
      equipements: req.body.equipements,
      date: req.body.date,
      time: req.body.time,
    });
    new_reservation.save((error, reservation) => {
      if (error) {
        console.log(error);
      }
      res.send(reservation);
    });
  });
};
