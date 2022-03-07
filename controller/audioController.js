const db = require("../models");
const path = require("path");
const axios = require("axios");
const { getAudioDurationInSeconds } = require("get-audio-duration");
// const cloudinary = require("cloudinary").v2;
// const streamifier = require("streamifier");
require("dotenv").config({ path: "../.env" });
const fileUpload = require("express-fileupload");
const app = require("express")();

// app.use(
//   fileUpload({
//     useTempFiles: true,
//   })
// );

// cloudinary.config({
//   cloud_name: "rutu",
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

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

// const addAudio = (req, res) => {
// let streamUpload = (req) => {
//   return new Promise((resolve, reject) => {
//     let stream = cloudinary.uploader.upload_stream((error, result) => {
//       if (result) {
//         resolve(result);
//       } else {
//         reject(error);
//       }
//     });

//     streamifier.createReadStream(req.file.buffer).pipe(stream);
//   });
// };

// async function upload(req) {
//   try {
//     let result = await streamUpload(req);
//     console.log(result);
//     getAudioDurationInSeconds(result.url).then((duration) => {
//       db.audioDetails
//         .create({
//           audioName: req.file.originalname,
//           audioFile: result.url,
//           audioLength: duration,
//         })
//         .then((data) => {
//           res.json({ message: "File Uploaded!", data });
//         })
//         .catch((err) => {
//           res.json({ error: err.message });
//         });
//     });
//   } catch (err) {
//     console.error(err);
//   }
// }

// upload(req);

// console.log(req);
// cloudinary.uploader.upload(
//   req.file.path,
//   {
//     resource_type: "raw",
//     public_id: `AudioUploads/${Date.now() + "-" + req.file.originalname}`,
//   },

//   // Send cloudinary response or catch error
//   (err, audio) => {
//     if (err) return res.send(err.message);
//     // res.json(audio);
//     // fs.unlinkSync(req.file.path);
//     // res.send(audio);
//     // console.log(audio.url);
//     getAudioDurationInSeconds(audio.url).then((duration) => {
//       db.audioDetails
//         .create({
//           audioName: req.file.originalname,
//           audioFile: audio.url,
//           audioLength: duration,
//         })
//         .then((data) => {
//           res.json({ message: "File Uploaded!", data });
//         })
//         .catch((err) => {
//           res.json({ error: err.message });
//         });
//     });
//   }
// );
// };

// Add Audio File
const addAudio = async (req, res) => {
  console.log(req.files);

  if (req.files) {
    var file = req.files["audioFile"];
    // var fileName = req.files["audioFile"].name;

    file.mv("./assets/uploads/" + req.files["audioFile"].name, function (err) {
      if (err)
        return res
          .status(400)
          .send(JSON.stringify({ failed: "Something went wrong" }));
    });
  } else {
    return res.status(400).send(JSON.stringify({ failed: "No such File" }));
  }
  // return res.status(200).send('{"status":"success"}');

  if (
    req.files["audioFile"].mimetype === "audio/basic" ||
    req.files["audioFile"].mimetype === "audio/mpeg" ||
    req.files["audioFile"].mimetype === "audio/vnd.wav" ||
    req.files["audioFile"].mimetype === "audio/vorbis" ||
    req.files["audioFile"].mimetype === "audio/ogg"
  ) {
    getAudioDurationInSeconds("./assets/uploads/" + req.files["audioFile"].name)
      .then((duration) => {
        // if (duration < 60) {
        //   duration = duration;
        //   duration = duration.toFixed(3) + " seconds";
        // } else if (duration > 60) {
        //   duration = duration / 60;
        //   duration = duration.toFixed(2) + " minutes";
        // }
        db.audioDetails
          .create({
            audioName: Date.now() + "-" + req.files["audioFile"].name,
            audioFile: "./assets/uploads/" + req.files["audioFile"].name,
            audioLength: duration,
          })
          .then((data) => {
            res.json({ message: "File Uploaded!", data });
          })
          .catch((err) => {
            res.json(err);
          });
      })
      .catch((err) => {
        // res.json(err);
        res.send(err.message);
      });
  } else {
    res.json({ message: "File type must be audio" });
  }
};
// };
// res.send("hey");

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

const addText = (req, res) => {
  // console.log(req);
  db.user
    .create({
      name: req.body.name,
    })
    .then((name) => {
      if (!name) {
        res.json({ message: "No data inserted!" });
        return;
      }
      res.json({ message: "Data inserted successfully!", name });
    })
    .catch((err) => {
      res.json({ message: err.message });
    });
};

module.exports = { addAudio, getAudios, addText };
