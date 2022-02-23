const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3001;
const audioRoutes = require("./routes/audioRoutes");
const db = require("./models");
const path = require("path");
const bodyParser = require("body-parser");

// var whitelist = [
//   "https://audio--manager.herokuapp.com",
//   "http://localhost:3000/audio/getAudios",
// ];
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
// app.use(cors(corsOptions));
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
