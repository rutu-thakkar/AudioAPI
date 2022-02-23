const db = require("../models");
const path = require("path");
const axios = require("axios");
const { getAudioDurationInSeconds } = require("get-audio-duration");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "rutu",
  api_key: "372743348695928",
  api_secret: "sg82sPOO5F9Fe2gWZKK9V7EDMoI",
});

//Get Audio
const getAudios = (req, res) => {
  // res.json({ message: "hey" });
  // res.send("heyy");
  db.audioDetails.findAll().then((audios) => {
    if (Object.keys(audios).length == 0) {
      res.send("no data found");
      return false;
    }

    res.json({ message: "Data", audios });
    // console.log(audios);
    // res.render("viewAudio", { audios });
    // res.json({ audios });
  });
};

const addAudio = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  // console.log(req.file);
  cloudinary.uploader.upload(
    req.file.path,
    // {
    //   resource_type: "raw",
    //   public_id: `AudioUploads/${Date.now() + "-" + req.file.originalname}`,
    // },

    // Send cloudinary response or catch error
    (err, audio) => {
      if (err) return res.send(err);
      res.json(audio);
      // fs.unlinkSync(req.file.path);
      // res.send(audio);
      // console.log(audio.url);
      // getAudioDurationInSeconds(audio.url).then((duration) => {
      //   db.audioDetails
      //     .create({
      //       audioFile: audio.url,
      //       audioLength: duration,
      //     })
      //     .then((data) => {
      //       res.json({ message: "File Uploaded!", data });
      //     })
      //     .catch((err) => {
      //       res.json({ error: err.message });
      //     });
      // });
    }
  );
};

// Add Audio File
// const addAudio = async (req, res) => {
//   // res.send("hey");

//   console.log(req.file);

// if (
//   req.file.mimetype === "audio/basic" ||
//   req.file.mimetype === "audio/mpeg" ||
//   req.file.mimetype === "audio/vnd.wav" ||
//   req.file.mimetype === "audio/vorbis" ||
//   req.file.mimetype === "audio/ogg"
// ) {
//   getAudioDurationInSeconds(req.file.path)
//     .then((duration) => {
// if (duration < 60) {
//   duration = duration;
//   duration = duration.toFixed(3) + " seconds";
// } else if (duration > 60) {
//   duration = duration / 60;
//   duration = duration.toFixed(2) + " minutes";
// }
//   db.audioDetails
//     .create({
//       audioFile: req.file.path,
//       audioLength: duration,
//     })
//     .then((data) => {
//       res.json({ message: "File Uploaded!", data });
//     });
// })
// .catch((err) => {
//   console.error(err);
// });
// } else {
//   res.json({ message: "File type must be audio" });
// }
// };

//Play Audio
// exports.getAudio = (req, res) => {
//   const { s } = req.params;
//   // const filePath = path.join("../uploads/", s);
//   const filePath = path.join("../uploads/", s);
//   console.log(filePath);
//   // res.json({
//   //   filePath: filePath,
//   // });
//   res.render("singleAudio", { fileName: s });

module.exports = { addAudio, getAudios };
