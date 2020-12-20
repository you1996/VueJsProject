const express = require("express");
const body_parser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const router = express.Router();
app.use(body_parser.json()); //using the body_parser
app.use(body_parser.urlencoded({ extended: true }));
app.use(cors()); //using cors
app.use(express.static(path.join(__dirname, "../dist"))); //For the deploy

// Load config
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
}); //For the CORS allow error
const connectDB = async () => {
  try {
    //Connecting to the mongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      autoIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
connectDB();

let modulee = require("./Controllers/Reservation");
modulee.controller(app); //use the controllers (the API Functions)

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html")); //send index.html when client requests the URL
});
const port = 8082;
app.use("/", router); //(optionnal)
app.listen(port, function () {
  console.log(" RestAPI running on port " + port);
});
