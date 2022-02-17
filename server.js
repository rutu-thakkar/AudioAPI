const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3001;
const audioRoutes = require("./routes/audioRoutes");
const db = require("./models");

app.use(cors());
app.use(express.json());
app.use("/audio", audioRoutes);
app.set("view engine", "ejs");

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
