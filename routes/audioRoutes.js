const express = require("express");
const route = express.Router();
const audioController = require("../controller/audioController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });
route.get("/", (req, res) => {
  res.send("hello world");
});
route.get("/getAudios", audioController.getAudios);
route.post("/addAudio", upload.single("audioFile"), audioController.addAudio);

module.exports = route;
