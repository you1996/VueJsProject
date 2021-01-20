const express = require("express");
const body_parser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(body_parser.json()); //using the body_parser
app.use(body_parser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
}); //For the CORS allow error
app.use(cors()); //using cors

const connectDB = async () => {
  try {
    //Connecting to the mongoDB
    const conn = await mongoose.connect(
      `mongodb+srv://chgh:adminrootnimda@cluster0.cmtlq.mongodb.net/Cluster0?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        autoIndex: true,
      }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
connectDB();

let modulee = require("./Controllers/Recette");
modulee.controller(app); //use the controllers (the API Functions)
app.use(express.static(__dirname + "/dist/")); ///the directory to the frontend
app.get(/.*/, (req, res) => res.sendFile(__dirname + "/dist/index.html")); ////the index.html is the file to send to the user

app.listen(process.env.PORT || 8082);
