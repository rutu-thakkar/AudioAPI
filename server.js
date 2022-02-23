const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3001;
const audioRoutes = require("./routes/audioRoutes");
const db = require("./models");
const path = require("path");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/audio", audioRoutes);
app.set("view engine", "ejs");
// app.set("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "assets")));

db.audioDetails
  .sync()
  .then(() => {
    app.listen(port, (req, res) => {
      console.log(`listening in http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
